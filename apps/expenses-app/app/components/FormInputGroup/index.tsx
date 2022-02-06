import { FormGroup, FromError, FromLabel } from './styles';
import { Props } from './types';

export const FormInputGroup = ({ label, children, error, inputId }: Props) => {
	return (
		<FormGroup>
			<FromLabel htmlFor={inputId}>{label}</FromLabel>
			{children}
			{error && <FromError>{error}</FromError>}
		</FormGroup>
	);
};
