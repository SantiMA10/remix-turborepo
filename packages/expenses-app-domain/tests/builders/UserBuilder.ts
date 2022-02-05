import * as Factory from 'factory.ts';
import faker from 'faker';

import { User } from '../../src';

export const UserBuilder = Factory.Sync.makeFactory<User>({
	id: Factory.each(() => faker.datatype.uuid()),
	name: Factory.each(() => faker.name.firstName()),
});
