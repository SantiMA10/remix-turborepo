import { PartialDeep } from 'type-fest';

import { ExpenseGroup } from '../entities/ExpenseGroup';

export interface ExpenseGroupRepository {
	findAll(): Promise<ExpenseGroup[]>;
	findById(id: ExpenseGroup['id']): Promise<ExpenseGroup | undefined>;
	update(expenseGroup: PartialDeep<ExpenseGroup>): Promise<ExpenseGroup | undefined>;
}
