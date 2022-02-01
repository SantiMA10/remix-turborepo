import { DomainError } from '../utils/DomainError';

interface Response<Data> {
	data?: Data;
	error?: DomainError;
}

export interface BaseUseCase<Options = unknown, Data = unknown> {
	perform(options: Options): Promise<Response<Data>>;
}
