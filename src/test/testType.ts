import { gql } from 'apollo-server';

export const testType = gql`
  type Tester {
    name: String
  }
  extend type Query {
    getTester: Tester!
  }
`;
