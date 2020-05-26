import { gql } from 'apollo-server';

export const recipeTypes = gql`
  type Step {
    name: String!
    body: String!
  }
  type NutritionValues {
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
  type Raters {
    keys: [String]!
    values: [Int]!
  }
  type Ingredient {
    name: String!
    amount: String!
  }
  enum RecipeProducer {
    HELLO_FRESH
    HOME_CHEF
    BLUE_APRON
  }
  type Recipe {
    id: ID!
    title: String!
    producer: String!
    ingredients: [Ingredient!]!
    preCook: [String]!
    steps: [Step!]!
    nutritionValues: NutritionValues!
    imgDir: String!
    favoriters: [String]!
    favorites: Int!
    raters: Raters!
  }
  type addRecipeRes {
    id: String
  }
  extend type Query {
    recipe(id: ID!): Recipe!
    recipes: [Recipe]!
    unapprovedRecipe(id: ID!): Recipe!
    unapprovedRecipes: [Recipe]!
  }
  extend type Mutation {
    submit(input: RecipeInput!): String!
    approve(input: ApproveRecipeInput!): Recipe!
    update(recipeId: ID!, recipe: RecipeInput!): String!
    favorite(id: ID!): String!
    rate(input: RateRecipeInput!): String!
    reject(id: ID!): String!
    delete(id: ID!): String!
  }
`;
