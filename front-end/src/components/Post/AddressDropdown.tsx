import React, { useState } from 'react';
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

import Address from 'src/ui-components/Address';
import styled from '@xstyled/styled-components';

interface Props{
	accounts: InjectedAccountWithMeta[]
	className?: string
	defaultAddress: string
	filterAccounts?: string[]
    onAccountChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void
}

const AddressDropdown = ({ accounts, className, defaultAddress, filterAccounts, onAccountChange }: Props) => {
	const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
	const filteredAccounts = !filterAccounts
		? accounts
		: accounts.filter( elem =>
			filterAccounts.includes(elem.address)
		);

	let dropdownList: {[index: string]: string} = {};
	let addressOptions: DropdownItemProps[] = [];

	filteredAccounts.forEach(account => {
		addressOptions.push({
			children: <Address
				accountName={account.meta.name}
				address={account.address}
			/>,
			value: account.address
		});

		if (account.address && account.meta.name){
			dropdownList[account.address] = account.meta.name;
		}

	}
	);

	const _onAccountChange = (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
		setSelectedAddress(data.value?.toString() || '');
		onAccountChange(event, data);
	};

	return <Dropdown
		className={className}
		onChange={_onAccountChange}
		options={addressOptions}
		trigger={<Address
			accountName={dropdownList[selectedAddress]}
			address={defaultAddress}
		/>}
		value={selectedAddress}
	/>;
};

export default styled(AddressDropdown)`
	width: 100%;
	border-color: grey_light;
	border-style: solid;
	border-width: 1px;
	padding: .2rem;
	padding-left: 1rem;

	> div {
		width: 90%;
		display: inline-block;
	}
`;
