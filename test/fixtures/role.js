import faker from 'faker';

export const createRole = {
  name: faker.name.findName(),
  permissions: faker.lorem.sentences(),
  description: faker.lorem.sentences(4),
};

export const editRole = {
  name: faker.name.findName()
};
