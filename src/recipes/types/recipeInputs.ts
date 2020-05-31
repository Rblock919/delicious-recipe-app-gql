import { gql } from 'apollo-server';

// TODO: refactor update recipe mutation so that passing in favoriters and raters is no longer required
export const recipeInputs = gql`
  input RecipeInput {
    title: String!
    producer: String!
    ingredients: [IngredientInput!]!
    preCook: [String!]
    steps: [StepInput!]!
    nutrition: NutritionValuesInput!
    imgDir: String!
  }
  input RatersInput {
    keys: [String]!
    values: [String]!
  }
  input NutritionValuesInput {
    calories: Int!
    fat: Float
    saturatedFat: Float
    carbohydrate: Int
    sugar: Int
    fiber: Int
    protein: Int
    cholesterol: Int
    sodium: Int
  }
  input StepInput {
    name: String!
    body: String!
  }
  input IngredientInput {
    name: String!
    amount: String!
  }
  input RateRecipeInput {
    recipeId: ID!
    rating: Int!
  }
  input ApproveRecipeInput {
    approvalId: ID!
    recipe: RecipeInput!
  }
  input UpdateRecipeInput {
    recipeId: ID!
    recipe: RecipeInput!
  }
`;
