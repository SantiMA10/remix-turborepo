import { ExpenseGroup } from 'expenses-app-domain';
import {
	ActionFunction,
	Form,
	Link,
	LoaderFunction,
	redirect,
	useActionData,
	useLoaderData,
	useTransition,
} from 'remix';
import invariant from 'tiny-invariant';

import { FormInputGroup } from '../../components/FormInputGroup';
import { Header } from '../../components/Header';
import { addUserToExpenseGroup } from '../../data/expenseGroups.server';

export const loader: LoaderFunction = async ({
	params,
}): Promise<{ expenseGroupId: ExpenseGroup['id'] }> => {
	invariant(params.id, 'expected params.id');

	return { expenseGroupId: params.id };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	const expenseGroupId = formData.get('expenseGroupId');
	const name = formData.get('name');

	const { error } = await addUserToExpenseGroup({
		expenseGroupId: typeof expenseGroupId === 'string' ? expenseGroupId : '',
		user: { name: typeof name === 'string' ? name : '' },
	});

	if (error) {
		const values = Object.fromEntries(formData);
		return { error, values };
	}

	return redirect(`/expense-groups/${expenseGroupId}`);
};

export default function NewUser() {
	const { expenseGroupId } = useLoaderData();
	const transition = useTransition();
	const actionData = useActionData();

	return (
		<>
			<Header>
				<Link to={`/expense-groups/${expenseGroupId}`}>Volver</Link>
			</Header>

			<Form method="post">
				<fieldset disabled={transition.state === 'submitting'}>
					<input type="hidden" name="expenseGroupId" defaultValue={expenseGroupId} />

					<h2>Añadir persona al grupo:</h2>

					{actionData?.error && <p>{actionData.error.message}</p>}

					<FormInputGroup label="Nombre" inputId="name">
						<input
							type="text"
							name="name"
							id="name"
							required
							defaultValue={actionData?.values?.name}
						/>
					</FormInputGroup>

					<p>
						<button type="submit">
							{transition.state === 'submitting' ? 'Añadiendo...' : 'Añadir'}
						</button>
					</p>
				</fieldset>
			</Form>
		</>
	);
}
