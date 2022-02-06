import { InMemoryExpenseGroupRepository } from '../../../src/repositories/InMemoryExpenseGroupRepository';

describe('InMemoryExpenseGroupRepository', () => {
	describe('#findAll', () => {
		it('returns the default number of expenses groups', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findAll();

			expect(result).toHaveLength(2);
		});
	});

	describe('#findById', () => {
		it('returns the ExpenseGroup from in memory list', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findById('1');

			expect(result).toMatchObject({
				id: '1',
				name: 'Group 1',
				expenses: [
					{
						id: '1',
						date: expect.any(Date),
						amount: 9,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				],
				users: [
					{ id: '1', name: 'Marisol' },
					{ id: '2', name: 'Juan' },
				],
			});
		});

		it('returns the undefined if the expense group does not exists', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.findById('14');

			expect(result).toBeUndefined();
		});
	});

	describe('#update', () => {
		it('returns the updated expense group', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.update({ id: '1' });

			expect(result).toMatchObject({ id: '1' });
		});

		it('returns undefined if the expense group does not exists in the in memory cache', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			const result = await subject.update({ id: '7' });

			expect(result).toBeUndefined();
		});

		it('updates the expense group in the in memory group', async () => {
			const subject = new InMemoryExpenseGroupRepository();

			await subject.update({ id: '1', name: 'The Best' });
			const result = await subject.findById('1');

			expect(result).toMatchObject({ id: '1', name: 'The Best' });
		});
	});
});
