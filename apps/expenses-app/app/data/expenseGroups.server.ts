import { InMemoryExpenseGroupRepository } from 'expenses-app-data';
import {
	AddUserToExpenseGroupUseCase,
	ExpenseGroup,
	GetAllExpenseGroupsUseCase,
	GetExpenseGroupUseCase,
	User,
} from 'expenses-app-domain';

const repository = new InMemoryExpenseGroupRepository();

export const getExpenseGroups = async () => {
	return new GetAllExpenseGroupsUseCase(repository).perform();
};

export const getExpenseGroup = async (id: ExpenseGroup['id']) => {
	return new GetExpenseGroupUseCase(repository).perform({ id });
};

export const addUserToExpenseGroup = async (options: {
	expenseGroupId: ExpenseGroup['id'];
	name: User['name'];
}) => {
	return new AddUserToExpenseGroupUseCase(repository).perform(options);
};