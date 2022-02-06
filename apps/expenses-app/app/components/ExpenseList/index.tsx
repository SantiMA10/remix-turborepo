import { ExpenseCard } from './components/ExpenseCard';
import { List } from './styles';
import { Props } from './types';

export const ExpenseList: React.FC<Props> = ({ expenses }: Props) => {
	if (expenses.length === 0) {
		return <p>No hay gastos en este grupo.</p>;
	}

	return (
		<>
			<h3>Gastos:</h3>
			<List>
				{expenses.map((expense) => {
					return <ExpenseCard key={expense.id} expense={expense} />;
				})}
			</List>
		</>
	);
};
