import { login, getUsers, createUser, updateUser, deleteUser, getUser } from './user/resolvers.js';

const resolvers = {
  Query: {
    getUsers,
    getUser
  },
  Mutation: {
    login,
    createUser,
    updateUser,
    deleteUser
  }
};

export default resolvers;
