import { Card } from './styles';
import { Props } from './types';

export const ExpenseCard: React.FC<Props> = ({ expense }: Props) => {
	return (
		<Card>
			<span>{expense.user.name}</span>
			<span>{expense.amount} €</span>
			<span>{expense.description}</span>
			<span>{new Date(expense.date).toLocaleDateString()}</span>
		</Card>
	);
};
