import { recipeResolvers } from '../recipeResolvers';
import { recipeModels } from '../models/recipe.model';

describe('RecipeResolvers', () => {
  describe('Queries', () => {
    let recipeService;
    let services;
    let id;
    let loaders;
    let models;

    beforeEach(() => {
      id = 'testId';
      loaders = { Recipe: { load: jest.fn() }, NewRecipe: { load: jest.fn() } };
      recipeService = {
        getAllRecipes: jest.fn(),
        getRecipeById: jest.fn(),
        getAllUnapprovedRecipes: jest.fn(),
        getUnapprovedRecipeById: jest.fn(),
      };
      services = { Recipe: recipeService };
      models = {
        Recipe: recipeModels.Recipe,
        NewRecipe: recipeModels.NewRecipe,
      };
    });

    it('should call getAllRecipes from recipeService on recipes query with the correct params', () => {
      recipeResolvers.Query.recipes(null, null, {
        services,
        models,
      });
      expect(recipeService.getAllRecipes).toHaveBeenCalledWith(
        recipeModels.Recipe
      );
    });

    it('should call getRecipeById from recipeService on recipe query with the correct params', () => {
      recipeResolvers.Query.recipe(
        null,
        { id },
        {
          services,
          loaders,
        }
      );
      expect(recipeService.getRecipeById).toHaveBeenCalledWith(
        id,
        loaders.Recipe
      );
    });

    it('should call getAllUnapprovedRecipes from recipeService on unapprovedRecipes query with the correct params', () => {
      recipeResolvers.Query.unapprovedRecipes(
        null,
        { id },
        {
          services,
          models,
        }
      );
      expect(recipeService.getAllUnapprovedRecipes).toHaveBeenCalledWith(
        models.NewRecipe
      );
    });

    it('should call getUnapprovedRecipeById from recipeService on unapprovedRecipe query with the correct params', () => {
      recipeResolvers.Query.unapprovedRecipe(
        null,
        { id },
        {
          services,
          loaders,
        }
      );
      expect(recipeService.getUnapprovedRecipeById).toHaveBeenCalledWith(
        id,
        loaders.NewRecipe
      );
    });
  });
});
