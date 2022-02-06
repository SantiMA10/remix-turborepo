import { ExpenseGroup } from 'expenses-app-domain';
import {
	ActionFunction,
	Form,
	LoaderFunction,
	redirect,
	useLoaderData,
	useTransition,
} from 'remix';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({
	params,
}): Promise<{ expenseGroupId: ExpenseGroup['id'] }> => {
	invariant(params.id, 'expected params.id');

	return { expenseGroupId: params.id };
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	return redirect(`/expense-groups/${formData.get('expenseGroupId')}`);
};

export default function NewUser() {
	const { expenseGroupId } = useLoaderData();
	const transition = useTransition();

	return (
		<Form method="post">
			<fieldset disabled={transition.state === 'submitting'}>
				<input type="hidden" name="expenseGroupId" defaultValue={expenseGroupId} />

				<h1>New User</h1>

				<p>
					<button type="submit">
						{transition.state === 'submitting' ? 'Creating...' : 'Create'}
					</button>
				</p>
			</fieldset>
		</Form>
	);
}
