import { Expense, User } from '.';

export interface ExpenseGroup {
	id: string;
	name: string;
	expenses: Expense[];
	users: Array<User & { balance?: number }>;
}

export const calculateExpenseGroupBalance = (expenseGroup: ExpenseGroup): ExpenseGroup => {
	return {
		...expenseGroup,
		users: expenseGroup.users.map((user) => ({
			...user,
			balance: expenseGroup.expenses.reduce((balance, expense) => {
				if (expense.user.id !== user.id) {
					return balance - expense.amount;
				}

				return balance + expense.amount;
			}, 0),
		})),
	};
};
