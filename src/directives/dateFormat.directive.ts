/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLString } from 'graphql';

import { formatDate } from '../helpers';

export class FormatDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver;
    const defaultFormat = this.args.format;

    field.args.push({
      name: 'format',
      type: GraphQLString,
    });

    field.resolve = async function(root, { format, ...rest }, ctx, info) {
      const date = await resolver.call(this, root, rest, ctx, info);
      return formatDate(date, format || defaultFormat);
    };
  }
}
