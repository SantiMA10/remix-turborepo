export interface DomainError {
	type: 'UnableToGetData' | 'EntityNotFound' | 'BadInputData';
	message: string;
}
