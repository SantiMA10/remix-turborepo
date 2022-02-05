import { Card, NegativeBalance, PositiveBalance } from './styles';
import { Props } from './types';

export const BalanceCard: React.FC<Props> = ({ user }: Props) => {
	return (
		<Card>
			<span>{user.name}</span>
			{user.balance && user.balance > 0 ? (
				<PositiveBalance data-testid="positive-balance">{user.balance} €</PositiveBalance>
			) : (
				<NegativeBalance data-testid="negative-balance">{user.balance} €</NegativeBalance>
			)}
		</Card>
	);
};
