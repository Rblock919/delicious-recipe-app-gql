import { UserInputError } from 'apollo-server';

// TODO: improve all methods with try-catches where relevant

export class RecipeService {
  constructor() {
    console.log('in recipe service constructor');
  }

  async getAllRecipes(recipeModel): Promise<any> {
    return recipeModel.find();
  }

  async getRecipeById(recipeId, recipeLoader): Promise<any> {
    return recipeLoader.load(recipeId);
  }

  async getAllUnapprovedRecipes(newRecipeModel): Promise<any> {
    return newRecipeModel.find();
  }

  async getUnapprovedRecipeById(recipeId, newRecipeLoader): Promise<any> {
    return newRecipeLoader.load(recipeId);
  }

  // TODO: TEST ALL THE BELOW FUNCTIONS NOW THAT THEY HAVE BEEN MOVED HERE
  // TODO: improve the below two methods with try-catches
  async deleteRecipe(recipeId, recipeModel): Promise<string> {
    await recipeModel.findByIdAndDelete(recipeId);
    return 'Success';
  }

  async rejectRecipe(approvalId, newRecipeModel): Promise<string> {
    await newRecipeModel.findByIdAndDelete(approvalId);
    return 'Success';
  }

  async rateRecipe(recipeId, rating, recipeModel, userId): Promise<string> {
    const recipe = await recipeModel.findById(recipeId);
    const { raters } = recipe;

    raters.set(userId, rating);

    await recipeModel.updateOne(
      { _id: recipeId },
      { $set: { raters } },
      { upsert: true, new: true }
    );

    return 'Success';
  }

  async favoriteRecipe(recipeId, recipeModel, userId): Promise<string> {
    const recipe = await recipeModel.findById(recipeId);
    const { favoriters } = recipe;
    let newFavoriters: string[];

    if (favoriters.includes(userId)) {
      newFavoriters = favoriters.filter((x: string) => x !== userId);
    } else {
      newFavoriters = favoriters;
      newFavoriters.push(userId);
    }

    await recipeModel.updateOne(
      { _id: recipeId },
      { $set: { favoriters: newFavoriters } },
      { upsert: true, new: true }
    );
    return 'Success';
  }

  async updateRecipe(recipe, recipeId, recipeModel): Promise<any> {
    const updatedData = {
      title: recipe.title,
      producer: recipe.producer,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imgDir: recipe.imgDir,
      // TODO: fix the discrepancy in the angular forms between nutrition & nutritionValues
      nutritionValues: recipe.nutrition,
    };

    return recipeModel.findByIdAndUpdate(
      recipeId,
      { $set: updatedData },
      {
        new: true,
      }
    );
  }

  async submitRecipeForApproval(input, NewRecipeModel): Promise<string> {
    const recipe = input;
    recipe.nutritionValues = { ...recipe.nutrition };
    delete recipe.nutrition;

    const newRecipe = new NewRecipeModel(recipe);

    // Since this value is an array in mongo it will autopopulate and therefor cannot implement reqruied at a db level
    if (newRecipe.producer !== 'Blue Apron' && newRecipe.preCook.length === 0) {
      throw new UserInputError(
        'Home Chef & Hello Fresh Recipes Must Have a Precook Value'
      );
    }

    await newRecipe.save();
    return 'Success';
  }

  async approveRecipe(
    approvalId,
    inputRecipe,
    RecipeModel,
    newRecipeModel
  ): Promise<any> {
    const recipe = inputRecipe;
    recipe.nutritionValues = { ...recipe.nutrition };
    delete recipe.nutrition;

    const newRecipe = new RecipeModel(recipe);

    await newRecipe.save();
    await newRecipeModel.findByIdAndDelete(approvalId);

    return newRecipe;
  }
}
