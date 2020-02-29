const { gql } = require('apollo-server');

export default gql`
  input inRecipe {
    _id: String
    title: String!
    producer: String!
    ingredients: [inIngredient!]
    preCook: [String!]
    steps: [inStep!]
    nutrition: inNutritionValues!
    imgDir: String!
    favoriters: [String]
    raters: inRaters!
  }
  input inRaters {
    keys: [String]
    values: [String]
  }
  input inNutritionValues {
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
  input inStep {
    name: String!
    body: String!
  }
  input inIngredient {
    name: String!
    amount: String!
  }
`;
