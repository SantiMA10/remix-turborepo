import { Header as HeaderStyled } from './styles';
import { Props } from './types';

export const Header = ({ children }: Props) => {
	return (
		<HeaderStyled>
			<h1>Balbal cash</h1>
			<div>{children}</div>
		</HeaderStyled>
	);
};
