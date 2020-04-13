// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { getPassingThreshold } from '@polkassembly/util';
import styled from '@xstyled/styled-components';
import BN from 'bn.js';
import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { ApiContext } from 'src/context/ApiContext';
import { VoteThreshold } from 'src/types';
import VoteProgress from 'src/ui-components/VoteProgress';
import formatBnBalance from 'src/util/formatBnBalance';

interface Props {
	className?: string
	referendumId: number
	threshold?: VoteThreshold
}

const ReferendumVoteInfo = ({ className, referendumId, threshold }: Props) => {
	const ZERO = new BN(0);
	const { api, apiReady } = useContext(ApiContext);
	const [turnout, setTurnout] = useState(ZERO);
	const [electorate, setElectorate] = useState(ZERO);
	const [passingThreshold, setPassingThreshold] = useState(ZERO);
	const [ayeVotes, setAyeVotes] = useState(ZERO);
	const [nayVotes, setNayVotes] = useState(ZERO);

	useEffect(() => {
		if (!api) {
			console.error('polkadot/api not set');
			return;
		}

		if (!apiReady) {
			console.error('api not ready');
			return;
		}

		let unsubscribe: () => void;

		api.query.democracy.referendumInfoOf(referendumId, (info) => {
			const _info = info.unwrapOr(null);

			if (_info?.isOngoing){
				setAyeVotes(_info?.asOngoing.tally.ayes);
				setNayVotes(_info?.asOngoing.tally.nays);
				setTurnout(_info?.asOngoing.tally.turnout);
			}
		})
			.then( unsub => {unsubscribe = unsub;})
			.catch(console.error);

		return () => unsubscribe && unsubscribe();
	}, [api, apiReady, referendumId]);

	useEffect(() => {
		if (!api) {
			console.error('polkadot/api not set');
			return;
		}

		if (!apiReady) {
			console.error('api not ready');
			return;
		}

		let unsubscribe: () => void;

		api.query.balances.totalIssuance((result) => {
			setElectorate(result);
		})
			.then( unsub => {unsubscribe = unsub;})
			.catch(console.error);

		return () => unsubscribe && unsubscribe();
	},[api, apiReady]);

	useEffect(() => {
		if (!threshold){
			console.error('No threshold set');
			return;
		}

		const res = getPassingThreshold(nayVotes, electorate, threshold);
		if (res.isValid && res.passingThreshold) {
			setPassingThreshold(res.passingThreshold);
		}
	}, [electorate, nayVotes, threshold, turnout]);

	return (
		<Grid className={className} columns={3} divided>
			<VoteProgress
				ayeVotes={ayeVotes}
				passingThreshold={passingThreshold}
				nayVotes={nayVotes}
			/>
			<Grid.Row>
				<Grid.Column>
					<h6>Turnout</h6>
					<div>{formatBnBalance(turnout, { numberAfterComma: 2 })}</div>
				</Grid.Column>
				<Grid.Column width={5}>
					<h6>Aye</h6>
					<div>{formatBnBalance(ayeVotes, { numberAfterComma: 2 })}</div>
				</Grid.Column>
				<Grid.Column width={5}>
					<h6>Nay</h6>
					<div>{formatBnBalance(nayVotes, { numberAfterComma: 2 })}</div>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default styled(ReferendumVoteInfo)`
	margin-bottom: 1rem;
`;
