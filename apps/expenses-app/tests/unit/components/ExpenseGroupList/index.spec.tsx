import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ExpenseGroupList } from '../../../../app/components/ExpenseGroupList';

describe('ExpenseGroupList', () => {
	it('shows the "Mis grupos de gasto" title', async () => {
		const { findByText } = render(
			<MemoryRouter>
				<ExpenseGroupList
					expenseGroups={[
						{
							id: '1',
							name: 'Group 1',
							expenses: [
								{
									id: '1',
									date: new Date(),
									amount: 9.99,
									description: '💿 Music Remix',
									user: { id: '1', name: 'Marisol' },
								},
							],
							users: [
								{ id: '1', name: 'Marisol' },
								{ id: '2', name: 'Juan' },
							],
						},
					]}
				/>
			</MemoryRouter>,
		);

		expect(await findByText(/Mis grupos de gasto:/i)).toBeInTheDocument();
	});

	it('shows the "No hay grupos de gasto" message if there is not expense group', async () => {
		const { findByText } = render(
			<MemoryRouter>
				<ExpenseGroupList expenseGroups={[]} />
			</MemoryRouter>,
		);

		expect(await findByText(/No hay grupos de gasto\./i)).toBeInTheDocument();
	});

	it('renders a link for each expense group', async () => {
		const { findByRole } = render(
			<MemoryRouter>
				<ExpenseGroupList
					expenseGroups={[
						{
							id: '1',
							name: 'Group 1',
							expenses: [
								{
									id: '1',
									date: new Date(),
									amount: 9.99,
									description: '💿 Music Remix',
									user: { id: '1', name: 'Marisol' },
								},
							],
							users: [
								{ id: '1', name: 'Marisol' },
								{ id: '2', name: 'Juan' },
							],
						},
					]}
				/>
			</MemoryRouter>,
		);

		expect(await findByRole('link')).toHaveAttribute('href', '/expense-groups/1');
	});
});
