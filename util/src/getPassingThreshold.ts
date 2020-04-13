// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { newtonRaphson, NewtonRaphsonResult } from './newton-raphson';
import { solveQuadraticEquation } from './solveQuadraticEquation';
import { PassingThresholdResult,VoteThreshold,VoteThresholdEnum } from './types';

/**
 * @name getPassingThreshold
 * @summary Calculates amount of aye needed for a referendum to pass
 * @param nays The amount of nay votes, including the mutliplication factors
 * @param electorate The total issuance of token in the network
 * @param threshold The type of bias of the vote
 **/

export function getPassingThreshold(nays: BN, electorate: BN, threshold: VoteThreshold ): PassingThresholdResult {
	const ONE = new BN(1);
	const TWO = new BN(2);
	const THREE = new BN(3);
	const TEN = new BN(10);
	const MAX_ITERATIONS = 20;

	if (nays.isZero()){
		// there is no vote against, any number of aye>0 would work
		return {
			isValid: true,
			passingThreshold: ONE
		};
	}

	if (threshold === VoteThresholdEnum.Simplemajority){
		return {
			isValid: true,
			passingThreshold: nays
		};
	}

	let result: NewtonRaphsonResult = { foundRoot: false };

	if (threshold === VoteThresholdEnum.Supermajorityapproval){
		const f = (x: BN) => {
			return x.pow(THREE).add(nays.mul(x.pow(TWO))).sub(nays.pow(TWO).mul(electorate));
		};

		const fp = (x: BN) => {
			return THREE.mul(x.pow(TWO)).add(TWO.mul(nays).mul(x));
		};

		const initialGuess = ONE;

		let i = 1;

		while (!result.foundRoot || i > MAX_ITERATIONS){
			result = newtonRaphson(f, fp, initialGuess.mul(TEN).pow(new BN(i)));
			i++;
		}

		return result.foundRoot
			? {
				isValid: false
			}
			: {
				isValid: true,
				passingThreshold: result.result as BN
			};
	} else {
		const res = solveQuadraticEquation(electorate.neg(), nays.pow(TWO), nays.pow(THREE));
		return {
			isValid: true,
			passingThreshold: BN.max(res[0],res[1])
		} ;
	}
}