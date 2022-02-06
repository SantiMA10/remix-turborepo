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

		it('calculates each balance by sum all the expenses and then subtract the expenses done by each user', async () => {
			const user1 = UserBuilder.build({ name: 'Francisco Buyo' });
			const user2 = UserBuilder.build({ name: 'Alfonso Pérez' });
			const user3 = UserBuilder.build({ name: 'Raúl González' });
			const user4 = UserBuilder.build({ name: 'José María Gutiérrez' });
			const expenseForUser1 = ExpenseBuilder.build({
				description: 'Cena',
				user: user1,
				amount: 100,
			});
			const expense1ForUser2 = ExpenseBuilder.build({
				description: 'Taxi',
				user: user2,
				amount: 10,
			});
			const expense2ForUser2 = ExpenseBuilder.build({
				description: 'Compra',
				user: user2,
				amount: 53.4,
			});
			const expenseGroup = ExpenseGroupBuilder.build({
				users: [user1, user2, user3, user4],
				expenses: [expenseForUser1, expense1ForUser2, expense2ForUser2],
			});

			const result = calculateExpenseGroupBalance(expenseGroup);

			expect(result).toMatchObject({
				users: [
					{ id: user1.id, balance: 59.15 },
					{ id: user2.id, balance: 22.55 },
					{ id: user3.id, balance: -40.85 },
					{ id: user4.id, balance: -40.85 },
				],
			});
		});
	});
});
