import { InMemoryExpenseGroupRepository } from '../../../src/repositories/InMemoryExpenseGroupRepository';

describe('InMemoryExpenseGroupRepository', () => {
	describe('#findAll', () => {
		it('returns the default number of expenses groups', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findAll();

			expect(result.length).toBe(3);
		});
	});
});
