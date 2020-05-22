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
    raters: Raters!
  }
  type User {
    id: ID
    username: String!
    password: String
    isAdmin: Boolean!
  }
  type AuthUser {
    user: User
    token: String
  }
  type addRecipeRes {
    id: String
  }
  extend type Query {
    recipe(id: ID!): Recipe!
    recipes: [Recipe]!
    unapprovedRecipe(id: String!): Recipe!
    unapprovedRecipes: [Recipe]!
  }
  extend type Mutation {
    submit(recipe: RecipeInput!): String!
    add(approvalId: ID!, recipe: RecipeInput!): addRecipeRes!
    update(recipeId: ID!, recipe: RecipeInput!): String!
    favorite(id: ID!, favoriters: [String]!): String!
    rate(id: ID!, ratersKeys: [String]!, ratersValues: [String]!): String!
    reject(id: ID!): String!
    delete(id: ID!): String!
  }
`;
