import styled from 'styled-components';

export const FormGroup = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
	marginBottom: '8px',
	marginTop: '8px',
});

export const FromLabel = styled('label')({
	fontWeight: 'bold',
});

export const FromError = styled('span')({
	color: 'red',
});
