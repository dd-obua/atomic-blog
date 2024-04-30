import { faker } from '@faker-js/faker';

const createRandomPost = function () {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
};

export default createRandomPost;
