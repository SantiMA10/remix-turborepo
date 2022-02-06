import { PropsWithChildren } from 'react';

interface FormInputGroupProps {
	label: string;
	error?: string;
	inputId: string;
}

export type Props = PropsWithChildren<FormInputGroupProps>;
