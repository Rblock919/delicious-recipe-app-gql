/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { SchemaDirectiveVisitor, UserInputError } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import mongoose from 'mongoose';

const validateInput = input => {
  let errorField;
  try {
    if (input.id) {
      errorField = 'id';
      mongoose.Types.ObjectId(input.id);
    }
    if (input.userId) {
      errorField = 'userId';
      mongoose.Types.ObjectId(input.userId);
    }
    if (input.recipeId) {
      errorField = 'recipeId';
      mongoose.Types.ObjectId(input.recipeId);
    }
    if (input.approvalId) {
      errorField = 'approvalId';
      mongoose.Types.ObjectId(input.approvalId);
    }
  } catch (error) {
    throw new UserInputError(`${errorField} must be a valid mongodb id`);
  }
};

export class ValidMongoIdDirective extends SchemaDirectiveVisitor {
  visitArgumentDefinition(argument, objectType) {
    const { field } = objectType;
    const resolver = field.resolve || defaultFieldResolver;

    field.resolve = async function(root, args, ctx, info) {
      const { input } = args;

      // directive is being used on a nested input object
      if (input) {
        // directive is being used on an input that is an array
        if (Array.isArray(input)) {
          Array.from(input).forEach(element => {
            validateInput(element);
          });
        } else {
          validateInput(input);
        }
      } else {
        // directive is being used directly on id field
        Object.values(args).forEach((arg, index) => {
          try {
            mongoose.Types.ObjectId(arg);
          } catch (error) {
            const errorField = Object.keys(args)[index];
            throw new UserInputError(
              `${errorField} must be a valid mongodb id`
            );
          }
        });
      }

      return resolver(root, args, ctx, info);
    };
    return argument;
  }
}
