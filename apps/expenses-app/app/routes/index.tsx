import { InMemoryExpenseGroupRepository } from 'expenses-app-data';
import { ExpenseGroup, GetAllExpenseGroupsUseCase } from 'expenses-app-domain';
import { MetaFunction, useLoaderData } from 'remix';
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

export const meta: MetaFunction = () => {
	return { title: 'Balbal cash | Comparte gastos como en Blabla car' };
};

export default function Index() {
	const expenseGroups = useLoaderData<ExpenseGroup[]>();

	return (
		<div>
			<h1>Balbal cash | Comparte gastos como en Blabla car</h1>

			<ExpenseGroupList expenseGroups={expenseGroups} />
		</div>
	);
}
