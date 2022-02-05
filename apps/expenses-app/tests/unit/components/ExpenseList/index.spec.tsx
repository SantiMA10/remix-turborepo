import { render } from '@testing-library/react';

import { ExpenseList } from '../../../../app/components/ExpenseList';

describe('ExpenseList', () => {
	it('shows the "Gastos" title', async () => {
		const { findByText } = render(
			<ExpenseList
				expenses={[
					{
						id: '1',
						date: new Date(),
						amount: 9.99,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				]}
			/>,
		);

		expect(await findByText(/Gastos:/i)).toBeInTheDocument();
	});

	it('shows a message if the expense list is empty', async () => {
		const { findByText } = render(<ExpenseList expenses={[]} />);

		expect(await findByText(/No hay gastos en este grupo\./i)).toBeInTheDocument();
	});

	it('shows the user for each expense', async () => {
		const { findByText } = render(
			<ExpenseList
				expenses={[
					{
						id: '1',
						date: new Date(),
						amount: 9.99,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				]}
			/>,
		);

		expect(await findByText(/Marisol/i)).toBeInTheDocument();
	});

	it('shows the description for each expense', async () => {
		const { findByText } = render(
			<ExpenseList
				expenses={[
					{
						id: '1',
						date: new Date(),
						amount: 9.99,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				]}
			/>,
		);

		expect(await findByText(/💿 Music Remix/i)).toBeInTheDocument();
	});

	it('shows the amount for each expense', async () => {
		const { findByText } = render(
			<ExpenseList
				expenses={[
					{
						id: '1',
						date: new Date(),
						amount: 9.99,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				]}
			/>,
		);

		expect(await findByText(/9\.99 €/i)).toBeInTheDocument();
	});

	it('shows the date in short format', async () => {
		const { findByText } = render(
			<ExpenseList
				expenses={[
					{
						id: '1',
						date: new Date('2017-04-20T11:32:00.000-04:00'),
						amount: 9.99,
						description: '💿 Music Remix',
						user: { id: '1', name: 'Marisol' },
					},
				]}
			/>,
		);

		expect(await findByText(/4\/20\/2017/i)).toBeInTheDocument();
	});
});
