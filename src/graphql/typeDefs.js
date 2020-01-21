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
  type Ingredient {
    name: String
    amount: String
  }
  type Recipe {
    _id: String
    title: String
    producer: String
    ingredients: [Ingredient]
    preCook: [String]
    steps: [Step]
    nutritionValues: NutritionValues
    imgDir: String
    favoriters: [String]
    raters: Raters
  }
  type User {
    _id: String
    username: String!
    password: String
    isAdmin: Boolean
  }
  type signInRes {
    user: User
    token: String
  }
  type addRecipeRes {
    id: String
  }
  type Query {
    users: [User]
    recipe(id: String!): Recipe
    recipes: [Recipe]
    unapprovedRecipe(id: String!): Recipe
    unapprovedRecipes: [Recipe]
    signOut: String
    getUserData: User
  }
  type Mutation {
    submitForApproval(title: String!, producer: String!, ingredientnames: [String]!, ingredientamounts: [String]!, preCook: [String], stepnames: [String]!, stepbodies: [String]!,
      imgDir: String!, calories: Int!, fat: Int, saturatedFat: Float, carbohydrate: Int, sugar: Int, fiber: Int, protein: Int,
      cholesterol: Int, sodium: Int): String
    addRecipe(approvalId: String!, title: String!, producer: String!, ingredientnames: [String]!, ingredientamounts: [String]!, preCook: [String], stepnames: [String]!,
      stepbodies: [String]!, imgDir: String!, calories: Int!, fat: Int, saturatedFat: Float, carbohydrate: Int, sugar: Int, fiber: Int, protein: Int,
      cholesterol: Int, sodium: Int): addRecipeRes
    favoriteRecipe(id: String!, favoriters: [String]!): String
    rateRecipe(id: String!, ratersKeys: [String]!, ratersValues: [String]!): String
    rejectRecipe(id: String!): String
    deleteRecipe(id: String!): String
    signIn(username: String!, password: String!): signInRes
    signUp(username: String!, password: String!): signInRes
  }
`;
