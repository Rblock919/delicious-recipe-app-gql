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
    _id: ID!
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
    comments: [Comment]!
  }
  extend type Query {
    recipe(id: ID!): Recipe! @authenticated
    recipes: [Recipe]! @authenticated
    unapprovedRecipe(id: ID!): Recipe! @authorized @authenticated
    unapprovedRecipes: [Recipe]! @authorized @authenticated
  }
  extend type Mutation {
    submit(input: RecipeInput!): String! @authenticated
    approve(input: ApproveRecipeInput!): Recipe! @authorized @authenticated
    update(input: UpdateRecipeInput!): Recipe! @authorized @authenticated
    favorite(id: ID!): String! @authenticated
    rate(input: RateRecipeInput!): String! @authenticated
    reject(id: ID!): String! @authorized @authenticated
    delete(id: ID!): String! @authorized @authenticated
  }
`;
