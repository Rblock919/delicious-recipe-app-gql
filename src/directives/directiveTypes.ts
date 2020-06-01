import { gql } from 'apollo-server';

export const directiveTypes = gql`
  directive @authenticated on FIELD_DEFINITION
  directive @authorized on FIELD_DEFINITION
  directive @formatDate(
    format: String = "dddd, mmmm dS, yyyy, h:MM:ss TT"
  ) on FIELD_DEFINITION
  directive @validMongoId on ARGUMENT_DEFINITION
`;
