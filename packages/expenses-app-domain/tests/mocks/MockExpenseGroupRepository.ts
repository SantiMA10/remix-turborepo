import { ExpenseGroupRepository } from '../../src';

export class MockExpenseGroupRepository implements ExpenseGroupRepository {
	public findAll: ExpenseGroupRepository['findAll'] = () => {
		throw new Error('Method not implemented.');
	};

	public findById: ExpenseGroupRepository['findById'] = () => {
		throw new Error('Method not implemented.');
	};

	public update: ExpenseGroupRepository['update'] = () => {
		throw new Error('Method not implemented.');
	};
}
