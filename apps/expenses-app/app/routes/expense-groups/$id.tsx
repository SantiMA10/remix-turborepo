import { ExpenseGroup } from 'expenses-app-domain';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }): Promise<ExpenseGroup> => {
	invariant(params.id, 'expected params.id');

	return { id: params.id, expenses: [], name: '', users: [] };
};

export default function Index() {
	const expenseGroup = useLoaderData<ExpenseGroup>();

	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			{JSON.stringify(expenseGroup)}
		</div>
	);
}
