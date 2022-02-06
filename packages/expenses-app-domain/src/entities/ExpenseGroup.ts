import { Expense, User } from '.';

export interface ExpenseGroup {
	id: string;
	name: string;
	expenses: Expense[];
	users: Array<User & { balance?: number }>;
}

export const calculateExpenseGroupBalance = (expenseGroup: ExpenseGroup): ExpenseGroup => {
	const totalDebt = expenseGroup.expenses.reduce((total, expense) => total - expense.amount, 0);
	const totalDebtPerUser = totalDebt / expenseGroup.users.length;

	return {
		...expenseGroup,
		users: expenseGroup.users.map((user) => {
			const balance = expenseGroup.expenses.reduce((balance, expense) => {
				if (expense.user.id !== user.id) {
					return balance;
				}

				// we are subtracting the total debt per user from the total expenses done by the user
				return balance + expense.amount;
			}, totalDebtPerUser);

			return {
				...user,
				// we are rounding to two decimals the balance
				balance: Math.round((balance + Number.EPSILON) * 100) / 100,
			};
		}),
	};
};
