import { randomUUID } from 'crypto';

import { Expense, ExpenseGroup, ExpenseGroupRepository, User } from '..';
import { ErrorType } from '../utils/ErrorType';
import { BaseUseCase } from '.';

type UseCase = BaseUseCase<{
	expenseGroupId: ExpenseGroup['id'];
	expense: Omit<Expense, 'id' | 'user'> & { user: { id: User['id'] } };
}>;

export class AddExpenseToExpenseGroupUseCase implements UseCase {
	public constructor(private readonly repository: ExpenseGroupRepository) {}

	public perform: UseCase['perform'] = async ({ expenseGroupId, expense }) => {
		const expenseGroup = await this.repository.findById(expenseGroupId);

		if (!expenseGroup) {
			return {
				error: {
					type: ErrorType.EntityNotFound,
					message: `ExpenseGroup (${expenseGroupId}) not found`,
				},
			};
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user = expenseGroup.users.find((user) => {
			if (user?.id === undefined || expense?.user?.id === undefined) {
				return false;
			}

			return user.id === expense.user.id;
		})!;

		if (!user) {
			return {
				error: {
					type: ErrorType.BadInputData,
					message: 'Unable to add the expense from a user not in the expense group',
				},
			};
		}

		this.repository.update({
			...expenseGroup,
			expenses: [...expenseGroup.expenses, { ...expense, id: randomUUID(), user }],
		});

		return {};
	};
}
