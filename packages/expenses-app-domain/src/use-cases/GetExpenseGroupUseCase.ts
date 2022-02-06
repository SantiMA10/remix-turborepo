import { calculateExpenseGroupBalance, ExpenseGroup, ExpenseGroupRepository } from '..';
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
						type: 'EntityNotFound',
						message: `ExpenseGroup (${id}) not found`,
					},
				};
			}

			return {
				data: calculateExpenseGroupBalance(expenseGroup),
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
