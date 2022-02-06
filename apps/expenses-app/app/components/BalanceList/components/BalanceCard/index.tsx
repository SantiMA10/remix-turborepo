import { useState } from 'react';

import { Card, NegativeBalance, PositiveBalance } from './styles';
import { Props } from './types';

export const BalanceCard: React.FC<Props> = ({ user }: Props) => {
	const [balance] = useState(`${user.balance} €`);

	if (user.balance === 0) {
		return (
			<Card>
				<span>{user.name}</span>
				<span>{balance}</span>
			</Card>
		);
	}

	return (
		<Card>
			<span>{user.name}</span>
			{user.balance && user.balance > 0 ? (
				<PositiveBalance data-testid="positive-balance">{balance}</PositiveBalance>
			) : (
				<NegativeBalance data-testid="negative-balance">{balance}</NegativeBalance>
			)}
		</Card>
	);
};
