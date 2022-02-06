import { UpdateExpenseGroupUseCase } from '../../../src';
import { ErrorType } from '../../../src/utils/ErrorType';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { UserBuilder } from '../../builders/UserBuilder';
import { MockExpenseGroupRepository } from '../../mocks/MockExpenseGroupRepository';

describe('UpdateExpenseGroupUseCase', () => {
	describe('#perform', () => {
		it('returns an data error if something fails inside the ExpenseGroupRepository', async () => {
			const expenseGroupRepository = new MockExpenseGroupRepository();
			const expenseGroup = ExpenseGroupBuilder.build();
			jest
				.spyOn(expenseGroupRepository, 'update')
				.mockImplementation(() => Promise.reject(new Error('error')));
			const subject = new UpdateExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ expenseGroup });

			expect(result).toMatchObject({
				error: { type: ErrorType.UnableToGetData, message: 'error' },
			});
		});

		it('returns undefined if the ExpenseGroup does not exist', async () => {
			const expenseGroupRepository = new MockExpenseGroupRepository();
			const expenseGroup = ExpenseGroupBuilder.build();
			jest
				.spyOn(expenseGroupRepository, 'update')
				.mockImplementation(() => Promise.resolve(undefined));
			const subject = new UpdateExpenseGroupUseCase(expenseGroupRepository);

			const result = await subject.perform({ expenseGroup });

			expect(result).toMatchObject({ data: undefined });
		});

		it('returns the updated expense group', async () => {
			const user = UserBuilder.build();
			const newUser = UserBuilder.build();
			const expenseGroup = ExpenseGroupBuilder.build({ users: [user] });
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'update')
				.mockImplementation((group) => Promise.resolve(ExpenseGroupBuilder.build(group)));
			const subject = new UpdateExpenseGroupUseCase(expenseGroupRepository);

			const { data } = await subject.perform({
				expenseGroup: { ...expenseGroup, users: [...expenseGroup.users, newUser] },
			});

			expect(data).toMatchObject({ users: [user, newUser] });
		});

		it('calls the "ExpenseGroupRepository" with the new expense group data', async () => {
			const expenseGroup = ExpenseGroupBuilder.build();
			const expenseGroupRepository = new MockExpenseGroupRepository();
			const spy = jest
				.spyOn(expenseGroupRepository, 'update')
				.mockImplementation((group) => Promise.resolve(ExpenseGroupBuilder.build(group)));
			const subject = new UpdateExpenseGroupUseCase(expenseGroupRepository);

			await subject.perform({
				expenseGroup,
			});

			expect(spy).toHaveBeenCalledWith(expenseGroup);
		});
	});
});
