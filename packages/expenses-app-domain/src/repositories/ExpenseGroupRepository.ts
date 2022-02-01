import { ExpenseGroup } from '../entities/ExpenseGroup';

export interface ExpenseGroupRepository {
	findAll(): Promise<ExpenseGroup[]>;
}
