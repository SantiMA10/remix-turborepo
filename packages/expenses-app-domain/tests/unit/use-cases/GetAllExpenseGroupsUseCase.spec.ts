import { GetAllExpenseGroupsUseCase } from '../../../src/use-cases/GetAllExpenseGroupsUseCase';
import { ErrorType } from '../../../src/utils/ErrorType';
import { ExpenseGroupBuilder } from '../../builders/ExpenseGroupBuilder';
import { MockExpenseGroupRepository } from '../../mocks/MockExpenseGroupRepository';

describe('GetAllExpenseGroupsUseCase', () => {
	describe('#perform', () => {
		it('returns an data error if something fails inside the ExpenseGroupRepository', async () => {
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'findAll')
				.mockImplementation(() => Promise.reject(new Error('error')));
			const subject = new GetAllExpenseGroupsUseCase(expenseGroupRepository);

			const result = await subject.perform();

			expect(result).toMatchObject({
				error: { type: ErrorType.UnableToGetData, message: 'error' },
			});
		});

		it('returns the data from the ExpenseGroupRepository', async () => {
			const expenseGroups = ExpenseGroupBuilder.buildList(2);
			const expenseGroupRepository = new MockExpenseGroupRepository();
			jest
				.spyOn(expenseGroupRepository, 'findAll')
				.mockImplementation(() => Promise.resolve(expenseGroups));
			const subject = new GetAllExpenseGroupsUseCase(expenseGroupRepository);

			const result = await subject.perform();

			expect(result).toMatchObject({
				data: expenseGroups,
			});
		});
	});
});
