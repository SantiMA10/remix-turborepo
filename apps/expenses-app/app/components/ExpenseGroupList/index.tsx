import { ExpenseGroupCard } from './components/ExpenseGroupCard';
import { List } from './styles';
import { Props } from './types';

export const ExpenseGroupList: React.FC<Props> = ({ expenseGroups }: Props) => {
	if (expenseGroups.length === 0) {
		return <p>No hay grupos de gasto.</p>;
	}

	return (
		<>
			<h2>Mis grupos de gasto:</h2>
			<List>
				{expenseGroups.map((expenseGroup) => {
					return <ExpenseGroupCard key={expenseGroup.id} expenseGroup={expenseGroup} />;
				})}
			</List>
		</>
	);
};
