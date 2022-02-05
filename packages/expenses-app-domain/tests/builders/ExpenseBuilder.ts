import * as Factory from 'factory.ts';
import faker from 'faker';

import { Expense } from '../../src';
import { UserBuilder } from './UserBuilder';

export const ExpenseBuilder = Factory.Sync.makeFactory<Expense>({
	id: Factory.each(() => faker.datatype.uuid()),
	user: UserBuilder.build(),
	amount: Factory.each(() => faker.datatype.number()),
	date: Factory.each(() => faker.date.recent()),
	description: Factory.each(() => faker.lorem.sentence()),
});
