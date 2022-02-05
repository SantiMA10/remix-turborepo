import { calculateExpenseGroupBalance } from '../../../src';
import { ExpenseBuilder } from '../../builders/ExpenseBuilder';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { UserBuilder } from '../../builders/UserBuilder';

describe('ExpenseGroup', () => {
	describe('#calculateBalance', () => {
		it('returns 0 balance for all the users if the expense group does not have any expenses', async () => {
			const user = UserBuilder.build();
			const expenseGroup = ExpenseGroupBuilder.build({ users: [user] });

			const result = calculateExpenseGroupBalance(expenseGroup);

			expect(result).toMatchObject({ users: [{ balance: 0 }] });
		});

		it('returns the sum of all the expense if there is only user', async () => {
			const user = UserBuilder.build();
			const expense1 = ExpenseBuilder.build({ user, amount: 100 });
			const expense2 = ExpenseBuilder.build({ user, amount: 200 });
			const expenseGroup = ExpenseGroupBuilder.build({
				users: [user],
				expenses: [expense1, expense2],
			});

			const result = calculateExpenseGroupBalance(expenseGroup);

			expect(result).toMatchObject({ users: [{ balance: 300 }] });
		});

		it('returns a negative balance if the user did not pay for any expense', async () => {
			const userPositiveBalance = UserBuilder.build();
			const userNegativeBalance = UserBuilder.build();
			const expense1 = ExpenseBuilder.build({ user: userPositiveBalance, amount: 100 });
			const expense2 = ExpenseBuilder.build({ user: userPositiveBalance, amount: 200 });
			const expenseGroup = ExpenseGroupBuilder.build({
				users: [userPositiveBalance, userNegativeBalance],
				expenses: [expense1, expense2],
			});

			const result = calculateExpenseGroupBalance(expenseGroup);

			expect(result).toMatchObject({
				users: [
					{ ...userPositiveBalance, balance: 300 },
					{ ...userNegativeBalance, balance: -300 },
				],
			});
		});

		it('returns 0 balance if all users have paid the same', async () => {
			const user1 = UserBuilder.build();
			const user2 = UserBuilder.build();
			const expense1 = ExpenseBuilder.build({ user: user1, amount: 100 });
			const expense2 = ExpenseBuilder.build({ user: user2, amount: 50 });
			const expense3 = ExpenseBuilder.build({ user: user2, amount: 50 });
			const expenseGroup = ExpenseGroupBuilder.build({
				users: [user1, user2],
				expenses: [expense1, expense2, expense3],
			});

			const result = calculateExpenseGroupBalance(expenseGroup);

			expect(result).toMatchObject({
				users: [
					{ ...user1, balance: 0 },
					{ ...user2, balance: 0 },
				],
			});
		});
	});
});
