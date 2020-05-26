/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

export class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, type) {
    const resolver = field.resolve || defaultFieldResolver;

    field.resolve = async function(root, args, ctx, info) {
      if (!ctx.user) {
        throw new AuthenticationError(
          'Not Authenticated. Please login or register.'
        );
      }
      return resolver(root, args, ctx, info);
    };
  }
}
