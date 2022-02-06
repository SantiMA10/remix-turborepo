import { ExpenseGroup, User } from 'expenses-app-domain';
import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
	useActionData,
	useLoaderData,
	useTransition,
} from 'remix';
import invariant from 'tiny-invariant';

import { addExpenseToExpenseGroup, getExpenseGroup } from '../../data/expenseGroups.server';

interface LoaderData {
	expenseGroupId: ExpenseGroup['id'];
	users: User[];
}

export const loader: LoaderFunction = async ({ params }): Promise<LoaderData> => {
	invariant(params.id, 'expected params.id');

	const { data, error } = await getExpenseGroup(params.id);

	if (error) {
		throw new Error(`[${error.type}] ${error.message}`);
	}

	invariant(data, 'expected data');

	return { expenseGroupId: params.id, users: data.users };
};

export const action: ActionFunction = async ({ request, context }) => {
	const formData = await request.formData();

	const expenseGroupId = formData.get('expenseGroupId');
	const amount = formData.get('amount');
	const date = formData.get('date');
	const description = formData.get('description');
	const userId = formData.get('userId');

	const { error } = await addExpenseToExpenseGroup({
		expenseGroupId: typeof expenseGroupId === 'string' ? expenseGroupId : '',
		expense: {
			amount: typeof amount === 'string' ? parseFloat(amount) : 0,
			date: typeof date === 'string' ? new Date(date) : new Date(),
			description: typeof description === 'string' ? description : '',
			user: {
				id: typeof userId === 'string' ? userId : '',
			},
		},
	});

	if (error) {
		const values = Object.fromEntries(formData);
		return { error, values };
	}

	return redirect(`/expense-groups/${formData.get('expenseGroupId')}`);
};

export default function NewExpense() {
	const { expenseGroupId, users } = useLoaderData<LoaderData>();
	const transition = useTransition();
	const actionData = useActionData();

	return (
		<Form method="post">
			<fieldset disabled={transition.state === 'submitting'}>
				<input type="hidden" name="expenseGroupId" defaultValue={expenseGroupId} />

				<h1>Añadir gasto al grupo:</h1>

				{actionData?.error && <p>{actionData.error.message}</p>}

				<label htmlFor="description">Description</label>
				<input
					type="text"
					name="description"
					id="description"
					required
					defaultValue={actionData?.values?.description}
				/>

				<label htmlFor="amount">Cantidad</label>
				<input
					type="number"
					name="amount"
					id="amount"
					required
					defaultValue={actionData?.values?.amount}
				/>

				<label htmlFor="date">Fecha</label>
				<input type="date" name="date" id="date" required defaultValue={actionData?.values?.date} />

				<label htmlFor="description">Persona</label>
				<select name="userId" id="userId">
					{users.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>

				<p>
					<button type="submit">
						{transition.state === 'submitting' ? 'Creating...' : 'Create'}
					</button>
				</p>
			</fieldset>
		</Form>
	);
}
