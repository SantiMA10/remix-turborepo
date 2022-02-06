import { ExpenseGroup, ExpenseGroupRepository } from 'expenses-app-domain';
import { merge, orderBy } from 'lodash';
import { DateTime } from 'luxon';

const expenseGroups: ExpenseGroup[] = [
	{
		id: '1',
		name: 'Group 1',
		expenses: [
			{
				id: '1',
				date: DateTime.now().minus({ days: 1 }).toJSDate(),
				amount: 9,
				description: '💿 Music Remix',
				user: { id: '1', name: 'Marisol' },
			},
			{
				id: '2',
				date: new Date(),
				amount: 9,
				description: '☕️ Coffee',
				user: { id: '2', name: 'Juan' },
			},
		],
		users: [
			{ id: '1', name: 'Marisol' },
			{ id: '2', name: 'Juan' },
		],
	},
	{ id: '2', name: 'Group 2', expenses: [], users: [] },
];

export class InMemoryExpenseGroupRepository implements ExpenseGroupRepository {
	public findById: ExpenseGroupRepository['findById'] = async (id) => {
		const expenseGroup = expenseGroups.find((expenseGroup) => expenseGroup.id === id);

		if (!expenseGroup) {
			return undefined;
		}

		return { ...expenseGroup, expenses: orderBy(expenseGroup.expenses, 'date', 'desc') };
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
