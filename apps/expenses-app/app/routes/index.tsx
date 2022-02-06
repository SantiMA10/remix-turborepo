import { ExpenseGroup } from 'expenses-app-domain';
import { MetaFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import { ExpenseGroupList } from '../components/ExpenseGroupList';
import { Header } from '../components/Header';
import { getExpenseGroups } from '../data/expenseGroups.server';

export async function loader(): Promise<ExpenseGroup[]> {
	const { data, error } = await getExpenseGroups();

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
			<Header />

			<ExpenseGroupList expenseGroups={expenseGroups} />
		</div>
	);
}
