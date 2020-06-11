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
}
