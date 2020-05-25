import { gql } from 'apollo-server';

// TODO: figure out if RatersInput is still needed
export const recipeInputs = gql`
  input RecipeInput {
    id: ID
    title: String!
    producer: String!
    ingredients: [IngredientInput!]!
    preCook: [String!]
    steps: [StepInput!]!
    nutrition: NutritionValuesInput!
    imgDir: String!
    favoriters: [String!]
    raters: RatersInput
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
`;
