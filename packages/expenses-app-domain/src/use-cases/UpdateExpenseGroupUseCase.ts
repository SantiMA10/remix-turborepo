import { ExpenseGroup, ExpenseGroupRepository } from '..';
import { ErrorType } from '../utils/ErrorType';
import { BaseUseCase } from '.';

type UseCase = BaseUseCase<{ expenseGroup: ExpenseGroup }, ExpenseGroup | undefined>;

export class UpdateExpenseGroupUseCase implements UseCase {
	public constructor(private expenseGroupRepository: ExpenseGroupRepository) {}

	public perform: UseCase['perform'] = async ({ expenseGroup }) => {
		try {
			return { data: await this.expenseGroupRepository.update(expenseGroup) };
		} catch (e) {
			if (e instanceof Error) {
				return {
					error: {
						type: ErrorType.UnableToGetData,
						message: e.message,
					},
				};
			}

			return {
				error: {
					type: ErrorType.UnableToGetData,
					message: 'Unknown error',
				},
			};
		}
	};
}
