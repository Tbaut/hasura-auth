// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Model } from 'objection';

import { JsonSchema } from '../types';
import connection from './connection';

Model.knex(connection);

export default class PasswordResetToken extends Model {
	expires!: string
	readonly id!: number
	token!: string
	user_id!: number
	valid!: boolean

	static get tableName (): string {
		return 'password_reset_token';
	}

	static get jsonSchema (): JsonSchema {
		return {
			properties: {
				expires: { type: 'string' },
				id: { type: 'integer' },
				token: { type: 'string' },
				user_id: { type: 'integer' },
				valid: { type: 'boolean' }
			},
			required: ['token', 'user_id'],
			type: 'object'
		};
	}
}

