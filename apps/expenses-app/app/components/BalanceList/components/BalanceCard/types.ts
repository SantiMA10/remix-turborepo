import { ExpenseGroup } from 'expenses-app-domain';

export interface Props {
	user: ExpenseGroup['users'][number];
}
