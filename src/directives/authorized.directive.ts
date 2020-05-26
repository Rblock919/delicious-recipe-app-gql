/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

export class AuthorizedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, type) {
    const resolver = field.resolve || defaultFieldResolver;

    field.resolve = async function(root, args, ctx, info) {
      if (ctx.user.isAdmin === false) {
        throw new AuthenticationError('Not Authorized.');
      }
      return resolver(root, args, ctx, info);
    };
  }
}
