// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Model } from 'objection';

import { JsonSchema } from '../types';
import connection from './connection';

Model.knex(connection);

export default class PostSubscription extends Model {
	readonly id!: number
	user_id!: number
	post_id!: number

	static get tableName (): string {
		return 'post_subscription';
	}

	static get jsonSchema (): JsonSchema {
		return {
			properties: {
				id: { type: 'integer' },
				post_id: { type: 'integer' },
				user_id: { type: 'integer' }
			},
			required: ['user_id', 'post_id'],
			type: 'object'
		};
	}
}

