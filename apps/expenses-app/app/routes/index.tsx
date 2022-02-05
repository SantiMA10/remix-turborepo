import { InMemoryExpenseGroupRepository } from 'expenses-app-data';
import { ExpenseGroup, GetAllExpenseGroupsUseCase } from 'expenses-app-domain';
import { useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import { ExpenseGroupList } from '../components/ExpenseGroupList';

export async function loader(): Promise<ExpenseGroup[]> {
	const { data, error } = await new GetAllExpenseGroupsUseCase(
		new InMemoryExpenseGroupRepository(),
	).perform();

	if (error) {
		throw new Error(`[${error.type}] ${error.message}`);
	}

	invariant(data, 'expected data');

	return data;
}

export default function Index() {
	const expenseGroups = useLoaderData<ExpenseGroup[]>();

	return <ExpenseGroupList expenseGroups={expenseGroups} />;
}
