import { ExpenseGroup, ExpenseGroupRepository } from 'expenses-app-domain';

const expenseGroups: ExpenseGroup[] = [
	{ id: '1', name: 'Group 1', expenses: [], users: [] },
	{ id: '2', name: 'Group 2', expenses: [], users: [] },
	{ id: '3', name: 'Group 3', expenses: [], users: [] },
];

export class InMemoryExpenseGroupRepository implements ExpenseGroupRepository {
	public findById: ExpenseGroupRepository['findById'] = (id) => {
		return Promise.resolve(expenseGroups.find((expenseGroup) => expenseGroup.id === id));
	};

	public findAll: ExpenseGroupRepository['findAll'] = async () => {
		return expenseGroups;
	};
}
