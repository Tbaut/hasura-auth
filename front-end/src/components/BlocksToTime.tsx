// Copyright 2019-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { bnToBn } from '@polkadot/util';
import BN from 'bn.js';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Popup } from 'semantic-ui-react';
import { ApiContext } from 'src/context/ApiContext';
import { chainProperties } from 'src/global/networkConstants';
import blockToTime from 'src/util/blockToTime';
import getNetwork from 'src/util/getNetwork';

interface Props {
	blocks: number | BN;
	className?: string
}

const BlocksToTime = ({ blocks, className }:Props ) => {
	const network = getNetwork();
	const { api, apiReady } = useContext(ApiContext);
	const DEFAULT_TIME = bnToBn(chainProperties?.[network]?.blockTime);
	const [blocktime, setBlocktime] = useState(DEFAULT_TIME);

	useEffect(() => {
		if (!api) {
			console.error('polkadot/api not set');
			return;
		}

		if (!apiReady) {
			console.error('api not ready');
			return;
		}

		setBlocktime(api.consts.babe?.expectedBlockTime);
	}, [ api, apiReady]);

	const popupStyle = {
		fontSize: '1.2rem'
	};

	return (
		<div className={className}>
			<Popup
				className={className}
				trigger={<div>{blockToTime(blocks , blocktime)}</div>}
				content={`${blocks} blocks`}
				hoverable={true}
				position='top left'
				style={popupStyle}
			/>
		</div>
	);
};

export default BlocksToTime;