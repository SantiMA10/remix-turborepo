import { ExpenseGroup, ExpenseGroupRepository } from 'expenses-app-domain';

const expenseGroups: ExpenseGroup[] = [
	{ id: '1', name: 'Group 1', expenses: [], users: [] },
	{ id: '2', name: 'Group 2', expenses: [], users: [] },
	{ id: '3', name: 'Group 3', expenses: [], users: [] },
];

export class InMemoryExpenseGroupRepository implements ExpenseGroupRepository {
	public async findAll(): Promise<ExpenseGroup[]> {
		return expenseGroups;
	}
}
