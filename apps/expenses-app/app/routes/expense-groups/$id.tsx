import { ExpenseGroup } from 'expenses-app-domain';
import { Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import { BalanceList } from '../../components/BalanceList';
import { ExpenseList } from '../../components/ExpenseList';
import { Header } from '../../components/Header';
import { getExpenseGroup } from '../../data/expenseGroups.server';

export const loader: LoaderFunction = async ({ params }): Promise<ExpenseGroup> => {
	invariant(params.id, 'expected params.id');

	const { data, error } = await getExpenseGroup(params.id);

	if (error) {
		throw new Error(`[${error.type}] ${error.message}`);
	}

	invariant(data, 'expected data');

	return data;
};

export const meta: MetaFunction = ({ data }) => {
	return { title: `${data.name} | Balbal cash` };
};

export default function ExpenseGroup() {
	const expenseGroup = useLoaderData<ExpenseGroup>();

	return (
		<>
			<Header>
				<Link to="/">Volver al listado</Link>
			</Header>

			<h2>{expenseGroup.name}</h2>

			<div>
				<Link to={`/expense-groups/${expenseGroup.id}/expenses/new`}>Añadir gasto</Link>
				<Link to={`/expense-groups/${expenseGroup.id}/users/new`}>Añadir persona</Link>
			</div>

			<ExpenseList expenses={expenseGroup.expenses} />
			<BalanceList users={expenseGroup.users} />
		</>
	);
}
