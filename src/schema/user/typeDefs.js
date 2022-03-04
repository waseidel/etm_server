import { gql } from 'apollo-server-core';

const user = gql`
  scalar Date
  type User {
    id: ID
    name: String
    email: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    checkSession: UserResponse!
  }

  type UserResponse {
    user: User
    token: String
  }

  type Mutation {
    login(email: String!, password: String!): UserResponse!
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): String
  }
`;

export default user;
