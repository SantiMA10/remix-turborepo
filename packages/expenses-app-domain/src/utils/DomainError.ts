import { ErrorType } from './ErrorType';

export interface DomainError {
	type: ErrorType;
	message: string;
}
