import { InMemoryExpenseGroupRepository } from 'expenses-app-data';
import {
	AddExpenseToExpenseGroupUseCase,
	AddUserToExpenseGroupUseCase,
	Expense,
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

export const addExpenseToExpenseGroup = async (options: {
	expenseGroupId: ExpenseGroup['id'];
	expense: Omit<Expense, 'id' | 'user'> & { user: { id: User['id'] } };
}) => {
	return new AddExpenseToExpenseGroupUseCase(repository).perform(options);
};
