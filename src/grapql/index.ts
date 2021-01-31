import user from './user.resolver';

export default {
  Query: {
    ...user.Query
  },
  Mutation: {
    ...user.Mutation
  }
};
