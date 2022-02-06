import { randomUUID } from 'crypto';

import { ExpenseGroup, ExpenseGroupRepository, User } from '..';
import { ErrorType } from '../utils/ErrorType';
import { BaseUseCase } from '.';

type UseCase = BaseUseCase<{ expenseGroupId: ExpenseGroup['id']; name: User['name'] }>;

export class AddUserToExpenseGroupUseCase implements UseCase {
	public constructor(private readonly repository: ExpenseGroupRepository) {}

	public perform: UseCase['perform'] = async ({ expenseGroupId, name }) => {
		const expenseGroup = await this.repository.findById(expenseGroupId);

		if (!expenseGroup) {
			return {
				error: {
					type: ErrorType.EntityNotFound,
					message: `ExpenseGroup (${expenseGroupId}) not found`,
				},
			};
		}

		this.repository.update({
			...expenseGroup,
			users: [...expenseGroup.users, { id: randomUUID(), name }],
		});

		return {};
	};
}
