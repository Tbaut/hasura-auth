import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ws from 'ws';

import {
	addDiscussionPostAndProposal,
	addDiscussionReferendum,
	proposalDiscussionExists
} from './graphql_helpers';
import { proposalSubscription, referendumSubscription } from './queries';
import { syncDBs } from './sync';

dotenv.config();

const subscriptionMutation = {
	Created: 'CREATED'
};
const eventStatus = {
	Started: 'Started'
};
const graphQLEndpoint = process.env.CHAIN_DB_GRAPHQL_URL;

async function main (): Promise<void> {
	console.log('🔄 Syncing chain-db and discussion-db...');
	await syncDBs();

	const getWsClient = function (wsurl: string): SubscriptionClient {
		const client = new SubscriptionClient(wsurl, { reconnect: true }, ws);
		return client;
	};

	// wsurl: GraphQL endpoint
	// query: GraphQL query (use gql`` from the 'graphql-tag' library)
	// variables: Query variables object
	const createSubscriptionObservable = (
		wsurl: string,
		query: any,
		variables?: any
	) => {
		const link = new WebSocketLink(getWsClient(wsurl));
		return execute(link, { query: query, variables: variables });
	};
	if (!graphQLEndpoint) {
		console.error(
			chalk.red('GraphQL endpoint not set in environment variables!')
		);
		return;
	}

	const proposalSubscriptionClient = createSubscriptionObservable(
		graphQLEndpoint,
		proposalSubscription
	);

	const referendumSubscriptionClient = createSubscriptionObservable(
		graphQLEndpoint,
		referendumSubscription
	);

	console.log(`🚀 Chain-db watcher listening to ${graphQLEndpoint}`);

	proposalSubscriptionClient.subscribe(
		({ data }): void => {
			if (data?.proposal.mutation === subscriptionMutation.Created) {
				const { proposalId, author } = data.proposal.node;
				proposalDiscussionExists(proposalId).then(alreadyExist => {
					if (!alreadyExist) {
						addDiscussionPostAndProposal({ onchainProposalId: Number(proposalId), proposer: author });
					} else {
						console.error(chalk.red(`✖︎ Proposal id ${proposalId.toString()} already exists in the discsussion db. Not inserted.`));
					}
				}).catch(error => console.error(chalk.red(error)));
			}
		},
		err => {
			console.error(chalk.red(err));
		}
	);

	referendumSubscriptionClient.subscribe(({ data }): void => {
		if (data?.referendum.mutation === subscriptionMutation.Created) {
			const {
				preimage,
				referendumId,
				referendumStatus
			} = data.referendum.node;

			// At referendum creation, there should be only
			// a "Started" status event.
			if (!(referendumStatus[0].status === eventStatus.Started)) {
				console.error(
					chalk.red(
						`Referendem with id ${referendumId.toString()} has an unexpected status. Expect "${eventStatus.Started}", got ${referendumStatus[0].status}."`
					)
				);
				return;
			}
			const referendumCreationBlockHash = referendumStatus[0].blockNumber.hash;
			// FIXME This only takes care of democracy proposals going from proposal -> referendum
			// it does not cater for any other proposal/motion that are externally tabled
			addDiscussionReferendum({
				preimageHash: preimage?.hash,
				referendumCreationBlockHash,
				referendumId
			}).catch(e => {
				console.error(chalk.red(e));
			});
		}
	});
}

main().catch(error => console.error(chalk.red(error)));
