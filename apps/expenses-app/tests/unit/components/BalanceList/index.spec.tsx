import { render } from '@testing-library/react';

import { BalanceList } from '../../../../app/components/BalanceList';

describe('BalanceList', () => {
	it('shows the "Balance" title', async () => {
		const { findByText } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: 0 }]} />,
		);

		expect(await findByText(/Balance:/i)).toBeInTheDocument();
	});

	it('shows a message if the expense list is empty', async () => {
		const { findByText } = render(<BalanceList users={[]} />);

		expect(await findByText(/No hay personas en este grupo\./i)).toBeInTheDocument();
	});

	it('shows all the users in the balance', async () => {
		const { findByText } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: 100 }]} />,
		);

		expect(await findByText(/Marisol/i)).toBeInTheDocument();
	});

	it('shows the balance for each user', async () => {
		const { findByText } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: 100 }]} />,
		);

		expect(await findByText(/100 €/i)).toBeInTheDocument();
	});

	it('shows a component with "positive-balance" test id if the user has positive balance', async () => {
		const { findByTestId } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: 100 }]} />,
		);

		expect(await findByTestId(/positive-balance/i)).toBeInTheDocument();
	});

	it('shows a component with "negative-balance" test id if the user has negative balance', async () => {
		const { findByTestId } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: -100 }]} />,
		);

		expect(await findByTestId(/negative-balance/i)).toBeInTheDocument();
	});

	it('does not apply any style if the balance is 0', async () => {
		const { findByText } = render(
			<BalanceList users={[{ id: '1', name: 'Marisol', balance: 0 }]} />,
		);

		const balance = await findByText(/0 €/i);
		expect(balance).not.toHaveAttribute('data-testid', 'positive-balance');
		expect(balance).not.toHaveAttribute('data-testid', 'negative-balance');
	});
});
