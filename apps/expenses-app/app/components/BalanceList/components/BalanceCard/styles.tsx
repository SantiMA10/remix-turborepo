import styled from 'styled-components';

export const Card = styled('div')({
	display: 'flex',
	gap: '8px',
});

export const PositiveBalance = styled('span')({
	color: 'green',
});

export const NegativeBalance = styled('span')({
	color: 'red',
});
