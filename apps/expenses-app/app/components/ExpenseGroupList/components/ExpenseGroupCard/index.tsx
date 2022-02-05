import { Link } from 'remix';

import { Card } from './styles';
import { Props } from './types';

export const ExpenseGroupCard: React.FC<Props> = ({ expenseGroup }: Props) => {
	return (
		<Link to={`/expense-groups/${expenseGroup.id}`}>
			<Card>
				<span>{expenseGroup.name}</span>
			</Card>
		</Link>
	);
};
