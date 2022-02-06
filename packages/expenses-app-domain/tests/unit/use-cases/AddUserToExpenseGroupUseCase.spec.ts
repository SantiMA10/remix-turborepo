import { AddUserToExpenseGroupUseCase } from '../../../src';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { UserBuilder } from '../../builders/UserBuilder';
import { MockExpenseGroupRepository } from '../../mocks/MockExpenseGroupRepository';

describe('AddUserToExpenseGroupUseCase', () => {
	describe('#perform', () => {
		it('returns an "EntityNotFound" error if the expense group does not exist', async () => {
			const repository = new MockExpenseGroupRepository();
			jest.spyOn(repository, 'findById').mockImplementation(() => Promise.resolve(undefined));
			const subject = new AddUserToExpenseGroupUseCase(repository);

			const result = await subject.perform({ expenseGroupId: 'id', user: { name: 'name' } });

			expect(result).toMatchObject({
				error: { type: 'EntityNotFound', message: 'ExpenseGroup (id) not found' },
			});
		});

		it('uses the update in the "ExpenseGroupRepository" to add the new user', async () => {
			const currentUser = UserBuilder.build();
			const expenseGroup = ExpenseGroupBuilder.build({ users: [currentUser] });
			const repository = new MockExpenseGroupRepository();
			jest.spyOn(repository, 'findById').mockImplementation(() => Promise.resolve(expenseGroup));
			const spyUpdate = jest
				.spyOn(repository, 'update')
				.mockImplementation((group) => Promise.resolve(ExpenseGroupBuilder.build(group)));
			const subject = new AddUserToExpenseGroupUseCase(repository);

			await subject.perform({ expenseGroupId: 'id', user: { name: 'name' } });

			expect(spyUpdate).toHaveBeenCalledWith({
				...expenseGroup,
				users: [currentUser, { id: expect.any(String), name: 'name' }],
			});
		});
	});
});
