import faker from 'faker';

export const newAdmin = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  roleId: faker.datatype.number({ min: 2, max: 5 })
};

export const updateAdmin = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};

export const adminPassword = {
  password: faker.internet.password(8),
};

export const adminPasswordWrongUpdate = {
  oldPassword: faker.internet.password(8),
  newPassword: faker.internet.password(8)
};

export const adminPasswordUpdate = {
  oldPassword: adminPassword.password,
  newPassword: faker.internet.password(8)
};
