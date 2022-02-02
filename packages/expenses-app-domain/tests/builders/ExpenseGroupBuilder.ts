import * as Factory from 'factory.ts';
import faker from 'faker';

import { ExpenseGroup } from '../../src';

export const ExpenseGroupBuilder = Factory.Sync.makeFactory<ExpenseGroup>({
	id: Factory.each(() => faker.datatype.uuid()),
	name: Factory.each(() => faker.commerce.productName()),
	expenses: [],
	users: [],
});
