const { gql } = require('apollo-server');

module.exports = gql`
  type Step {
    name: String!
    body: String!
  }
  type NutritionValues {
    calories: Int!
    fat: Int
    saturatedFat: Float
    carbohydrate: Int
    sugar: Int
    fiber: Int
    protein: Int
    cholesterol: Int
    sodium: Int
  }
  type Raters {
    keys: [String]
    values: [String]
  }
  type Recipe {
    _id: String
    title: String
    producer: String
    ingredients: [String]
    preCook: [String]
    steps: [Step]
    nutritionValues: NutritionValues
    imgDir: String
    favoriters: [String]
    raters: Raters
  }
  type User {
    _id: String!
    username: String
    password: String
    isAdmin: Boolean
  }
  type Query {
    users: [User]
    recipe(recipeId: String!): Recipe
    recipes: [Recipe]
    unapprovedRecipe(recipeId: String!): Recipe
    unapprovedRecipes: [Recipe]
  }
`;
