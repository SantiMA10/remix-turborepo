import { calculateExpenseGroupBalance, ExpenseGroup } from '../entities/ExpenseGroup';
import { ExpenseGroupRepository } from '../repositories/ExpenseGroupRepository';
import { BaseUseCase } from './BaseUseCase';

type UseCase = BaseUseCase<void, ExpenseGroup[]>;

export class GetAllExpenseGroupsUseCase implements BaseUseCase {
	public constructor(public expenseGroupRepository: ExpenseGroupRepository) {}

	public perform: UseCase['perform'] = async () => {
		try {
			const expenseGroups = await this.expenseGroupRepository.findAll();

			return {
				data: expenseGroups.map((expenseGroup) => calculateExpenseGroupBalance(expenseGroup)),
			};
		} catch (e) {
			if (e instanceof Error) {
				return {
					error: {
						type: 'UnableToGetData',
						message: e.message,
					},
				};
			}

			return {
				error: {
					type: 'UnableToGetData',
					message: 'Unknown error',
				},
			};
		}
	};
}
