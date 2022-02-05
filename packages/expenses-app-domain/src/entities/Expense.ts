import { User } from '.';

export interface Expense {
	id: string;
	user: User;
	amount: number;
	description: string;
	date: Date;
}
