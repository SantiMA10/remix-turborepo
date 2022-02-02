import { ExpenseGroup, ExpenseGroupRepository } from '..';
import { ErrorType } from '../utils/ErrorType';
import { BaseUseCase } from '.';

type UseCase = BaseUseCase<{ id: ExpenseGroup['id'] }, ExpenseGroup>;

export class GetExpenseGroupUseCase implements UseCase {
	public constructor(public expenseGroupRepository: ExpenseGroupRepository) {}

	public perform: UseCase['perform'] = async ({ id }) => {
		try {
			const expenseGroup = await this.expenseGroupRepository.findById(id);

			if (!expenseGroup) {
				return {
					error: {
						type: ErrorType.EntityNotFound,
						message: `ExpenseGroup (${id}) not found`,
					},
				};
			}

			return {
				data: expenseGroup,
			};
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
