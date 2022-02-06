import { useState } from 'react';

import { Card, NegativeBalance, PositiveBalance } from './styles';
import { Props } from './types';

export const BalanceCard: React.FC<Props> = ({ user }: Props) => {
	const [balance] = useState(`${user.balance} €`);

	return (
		<Card>
			<span>{user.name}</span>
			{user.balance === 0 && <span>{balance}</span>}
			{user.balance && user.balance > 0 && (
				<PositiveBalance data-testid="positive-balance">{balance}</PositiveBalance>
			)}
			{user.balance && user.balance < 0 && (
				<NegativeBalance data-testid="negative-balance">{balance} €</NegativeBalance>
			)}
		</Card>
	);
};
