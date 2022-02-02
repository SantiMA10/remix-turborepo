import { InMemoryExpenseGroupRepository } from '../../../src/repositories/InMemoryExpenseGroupRepository';

describe('InMemoryExpenseGroupRepository', () => {
	describe('#findAll', () => {
		it('returns the default number of expenses groups', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findAll();

			expect(result).toHaveLength(3);
		});
	});

	describe('#findById', () => {
		it('returns the ExpenseGroup from in memory list', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findById('1');

			expect(result).toMatchObject({ id: '1', name: 'Group 1', expenses: [], users: [] });
		});

		it('returns the undefined if the expense group does not exists', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findById('14');

			expect(result).toBeUndefined();
		});
	});
});
