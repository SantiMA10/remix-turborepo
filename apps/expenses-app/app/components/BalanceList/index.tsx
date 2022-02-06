import { BalanceCard } from './components/BalanceCard';
import { List } from './styles';
import { Props } from './types';

export const BalanceList: React.FC<Props> = ({ users }: Props) => {
	if (users.length === 0) {
		return <p>No hay personas en este grupo.</p>;
	}

	return (
		<>
			<h3>Balance:</h3>
			<List>
				{users.map((user) => {
					return <BalanceCard key={user.id} user={user} />;
				})}
			</List>
		</>
	);
};
