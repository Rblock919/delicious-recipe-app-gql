import mongoose from 'mongoose';

const recipeModel = new mongoose.Schema({
  title: {
    type: String,
  },
  producer: {
    type: String,
  },
  ingredients: [
    {
      _id: false,
      name: String,
      amount: String,
    },
  ],
  preCook: [String],
  steps: [
    {
      _id: false,
      name: String,
      body: String,
    },
  ],
  nutritionValues: {
    calories: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    saturatedFat: {
      type: Number,
    },
    carbohydrate: {
      type: Number,
    },
    sugar: {
      type: Number,
    },
    fiber: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    sodium: {
      type: Number,
    },
  },
  imgDir: {
    type: String,
  },
  favoriters: [String],
  raters: {
    type: Map,
    of: Number,
  },
});

export const recipeModels = {
  NewRecipe: mongoose.model('approvalList', recipeModel),
  Recipe: mongoose.model('recipe', recipeModel),
};
