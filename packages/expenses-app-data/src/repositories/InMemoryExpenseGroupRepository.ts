import { ExpenseGroup, ExpenseGroupRepository } from 'expenses-app-domain';
import { merge } from 'lodash';

const expenseGroups: ExpenseGroup[] = [
	{
		id: '1',
		name: 'Group 1',
		expenses: [
			{
				id: '1',
				date: new Date(),
				amount: 9.99,
				description: '💿 Music Remix',
				user: { id: '1', name: 'Marisol' },
			},
		],
		users: [
			{ id: '1', name: 'Marisol' },
			{ id: '2', name: 'Juan' },
		],
	},
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

	public update: ExpenseGroupRepository['update'] = async (expenseGroupLike) => {
		const expenseGroup = expenseGroups.find(({ id }) => expenseGroupLike.id === id);

		if (!expenseGroup) {
			return;
		}

		return merge(expenseGroup, expenseGroupLike);
	};
}
