import { ExpenseGroupRepository } from '../../../src/repositories/ExpenseGroupRepository';
import { GetAllExpenseGroupsUseCase } from '../../../src/use-cases/GetAllExpenseGroupsUseCase';
import { ErrorType } from '../../../src/utils/ErrorType';

describe('GetAllExpenseGroupsUseCase', () => {
	describe('#perform', () => {
		it('returns an data error if something fails inside the ExpenseGroupRepository', async () => {
			const expenseGroupRepository: ExpenseGroupRepository = {
				findAll: () => Promise.reject(new Error('error')),
			};
			const subject = new GetAllExpenseGroupsUseCase(expenseGroupRepository);

			const result = await subject.perform();

			expect(result).toMatchObject({
				error: { type: ErrorType.UnableToGetData, message: 'error' },
			});
		});

		it('returns the data from the ExpenseGroupRepository', async () => {
			const expenseGroupRepository: ExpenseGroupRepository = {
				findAll: () => Promise.resolve([]),
			};
			const subject = new GetAllExpenseGroupsUseCase(expenseGroupRepository);

			const result = await subject.perform();

			expect(result).toMatchObject({
				data: [],
			});
		});
	});
});
