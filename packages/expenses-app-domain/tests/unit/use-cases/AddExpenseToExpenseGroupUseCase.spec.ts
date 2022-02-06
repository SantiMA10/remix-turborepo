import { AddExpenseToExpenseGroupUseCase } from '../../../src';
import { ErrorType } from '../../../src/utils/ErrorType';
import { ExpenseBuilder } from '../../builders/ExpenseBuilder';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { UserBuilder } from '../../builders/UserBuilder';
import { MockExpenseGroupRepository } from '../../mocks/MockExpenseGroupRepository';

describe('AddExpenseToExpenseGroupUseCase', () => {
	describe('#perform', () => {
		it('returns an "EntityNotFound" error if the expense group does not exist', async () => {
			const repository = new MockExpenseGroupRepository();
			jest.spyOn(repository, 'findById').mockImplementation(() => Promise.resolve(undefined));
			const subject = new AddExpenseToExpenseGroupUseCase(repository);

			const result = await subject.perform({
				expenseGroupId: 'id',
				expense: ExpenseBuilder.build(),
			});

			expect(result).toMatchObject({
				error: { type: ErrorType.EntityNotFound, message: 'ExpenseGroup (id) not found' },
			});
		});

		it('uses the update in the "ExpenseGroupRepository" to add the new expense', async () => {
			const user = UserBuilder.build();
			const currentExpense = ExpenseBuilder.build({ user });
			const newExpense = ExpenseBuilder.build({ id: undefined, user });
			const expenseGroup = ExpenseGroupBuilder.build({ expenses: [currentExpense], users: [user] });
			const repository = new MockExpenseGroupRepository();
			jest.spyOn(repository, 'findById').mockImplementation(() => Promise.resolve(expenseGroup));
			const spyUpdate = jest
				.spyOn(repository, 'update')
				.mockImplementation((group) => Promise.resolve(ExpenseGroupBuilder.build(group)));
			const subject = new AddExpenseToExpenseGroupUseCase(repository);

			await subject.perform({
				expenseGroupId: expenseGroup.id,
				expense: { ...newExpense, user: { id: user.id } },
			});

			expect(spyUpdate).toHaveBeenCalledWith({
				...expenseGroup,
				expenses: [currentExpense, { ...newExpense, user, id: expect.any(String) }],
			});
		});

		it('return a error if the expense is from a user not in the expense group', async () => {
			const user = UserBuilder.build();
			const currentExpense = ExpenseBuilder.build({ user });
			const newExpense = ExpenseBuilder.build({ id: undefined, user: UserBuilder.build() });
			const expenseGroup = ExpenseGroupBuilder.build({ expenses: [currentExpense], users: [user] });
			const repository = new MockExpenseGroupRepository();
			jest.spyOn(repository, 'findById').mockImplementation(() => Promise.resolve(expenseGroup));
			const subject = new AddExpenseToExpenseGroupUseCase(repository);

			const result = await subject.perform({
				expenseGroupId: expenseGroup.id,
				expense: newExpense,
			});

			expect(result).toMatchObject({
				error: {
					type: ErrorType.BadInputData,
					message: 'Unable to add the expense from a user not in the expense group',
				},
			});
		});
	});
});
