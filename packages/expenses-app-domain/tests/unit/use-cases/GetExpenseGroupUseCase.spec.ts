import { GetExpenseGroupUseCase } from '../../../src';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { UserBuilder } from '../../builders/UserBuilder';
import { MockExpenseGroupRepository } from '../../mocks/MockExpenseGroupRepository';

describe('GetExpenseGroupUseCase', () => {
	describe('#perform', () => {
		it('returns an data error if something fails inside the ExpenseGroupRepository', async () => {
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'findById')
				.mockImplementation(() => Promise.reject(new Error('error')));
			const expenseGroup = ExpenseGroupBuilder.build();
			const subject = new GetExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ id: expenseGroup.id });

			expect(result).toMatchObject({
				error: { type: 'UnableToGetData', message: 'error' },
			});
		});

		it('returns an not found if the expense group does not exists', async () => {
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'findById')
				.mockImplementation(() => Promise.resolve(undefined));
			const expenseGroup = ExpenseGroupBuilder.build();
			const subject = new GetExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ id: expenseGroup.id });

			expect(result).toMatchObject({
				error: {
					type: 'EntityNotFound',
					message: `ExpenseGroup (${expenseGroup.id}) not found`,
				},
			});
		});

		it('returns the data from the ExpenseGroupRepository', async () => {
			const expenseGroup = ExpenseGroupBuilder.build();
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest

				.spyOn(expenseGroupRepository, 'findById')
				.mockImplementation(() => Promise.resolve(expenseGroup));
			const subject = new GetExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ id: expenseGroup.id });

			expect(result).toMatchObject({
				data: expenseGroup,
			});
		});

		it('returns the data from the ExpenseGroupRepository with the balance in each user', async () => {
			const user = UserBuilder.build();
			const expenseGroup = ExpenseGroupBuilder.build({ users: [user] });
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'findById')
				.mockImplementation(() => Promise.resolve(expenseGroup));
			const subject = new GetExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ id: expenseGroup.id });

			expect(result).toMatchObject({
				data: { ...expenseGroup, users: [{ ...user, balance: 0 }] },
			});
		});
	});
});
