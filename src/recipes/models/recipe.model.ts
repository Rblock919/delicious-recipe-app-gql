import mongoose from 'mongoose';

const isNotBlueApron = function(): boolean {
  return this.producer !== 'Blue Apron';
};

const isHelloFresh = function(): boolean {
  return this.producer === 'Hello Fresh';
};

const isNotNegative = (value): boolean => {
  return value > 0;
};

const validateNutritionNumber = {
  validator: isNotNegative,
  message: 'Value Cannot Be Negative',
};

const recipeModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
    enum: ['Hello Fresh', 'Home Chef', 'Blue Apron'],
  },
  ingredients: [
    {
      _id: false,
      type: new mongoose.Schema({
        name: { type: String, required: true },
        amount: { type: String, required: true },
      }),
      required: true,
    },
  ],
  preCook: [
    {
      _id: false,
      type: [String],
      validate: {
        validator: isNotBlueApron,
        message: 'Blue Apron Meals Cannot Have Precook Values',
      },
      required: true,
    },
  ],
  steps: [
    {
      _id: false,
      type: new mongoose.Schema({
        name: { type: String, required: true },
        body: { type: String, required: true },
      }),
      required: true,
    },
  ],
  nutritionValues: {
    calories: {
      type: Number,
      required: true,
      validate: validateNutritionNumber,
    },
    protein: {
      type: Number,
      required: isNotBlueApron,
      validate: validateNutritionNumber,
    },
    fat: {
      type: Number,
      required: isNotBlueApron,
      validate: validateNutritionNumber,
    },
    carbohydrate: {
      type: Number,
      required: isNotBlueApron,
      validate: validateNutritionNumber,
    },
    sodium: {
      type: Number,
      required: isNotBlueApron,
      validate: validateNutritionNumber,
    },
    saturatedFat: {
      type: Number,
      required: isHelloFresh,
      validate: validateNutritionNumber,
    },
    sugar: {
      type: Number,
      required: isHelloFresh,
      validate: validateNutritionNumber,
    },
    fiber: {
      type: Number,
      required: isHelloFresh,
      validate: validateNutritionNumber,
    },
    cholesterol: {
      type: Number,
      required: isHelloFresh,
      validate: validateNutritionNumber,
    },
  },
  imgDir: {
    type: String,
    required: true,
  },
  favoriters: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  raters: {
    type: Map,
    of: Number,
    default: new Map<string, number>(),
  },
});

export const recipeModels = {
  NewRecipe: mongoose.model('approvalList', recipeModel),
  Recipe: mongoose.model('recipe', recipeModel),
};
