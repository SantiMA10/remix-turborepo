import { InMemoryExpenseGroupRepository } from 'expenses-app-data';
import { ExpenseGroup, GetExpenseGroupUseCase } from 'expenses-app-domain';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }): Promise<ExpenseGroup> => {
	invariant(params.id, 'expected params.id');

	const { data, error } = await new GetExpenseGroupUseCase(
		new InMemoryExpenseGroupRepository(),
	).perform({ id: params.id });

	if (error) {
		throw new Error(`[${error.type}] ${error.message}`);
	}

	invariant(data, 'expected data');

	return data;
};

export const meta: MetaFunction = ({ data }) => {
	return { title: `${data.name} | Balbal cash` };
};

export default function Index() {
	const expenseGroup = useLoaderData<ExpenseGroup>();

	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			{JSON.stringify(expenseGroup)}
		</div>
	);
}
