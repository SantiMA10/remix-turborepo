import { Link } from 'remix';

import { Box } from './styles';
import { Props } from './types';

export const ExpenseGroupCard: React.FC<Props> = ({ expenseGroup }: Props) => {
	return (
		<Link to={`/expense-groups/${expenseGroup.id}`}>
			<Box>{expenseGroup.name}</Box>
		</Link>
	);
};
