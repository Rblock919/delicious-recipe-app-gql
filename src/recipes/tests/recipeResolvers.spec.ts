import { recipeResolvers } from '../recipeResolvers';
import { recipeModels } from '../models/recipe.model';

describe('RecipeResolvers', () => {
  describe('Queries', () => {
    let recipeService;
    let services;
    let id;
    let loaders;
    let models;
    let user;

    beforeEach(() => {
      id = 'testId';
      user = {
        username: 'dev',
        _id: 'userId',
        isAdmin: true,
      };
      loaders = { Recipe: { load: jest.fn() }, NewRecipe: { load: jest.fn() } };
      recipeService = {
        getAllRecipes: jest.fn(),
        getRecipeById: jest.fn(),
        getAllUnapprovedRecipes: jest.fn(),
        getUnapprovedRecipeById: jest.fn(),
        deleteRecipe: jest.fn(),
        rejectRecipe: jest.fn(),
        rateRecipe: jest.fn(),
        favoriteRecipe: jest.fn(),
        updateRecipe: jest.fn(),
        submitRecipeForApproval: jest.fn(),
        approveRecipe: jest.fn(),
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

    it('should call deleteRecipe from recipeService on delete mutation with the correct params', () => {
      recipeResolvers.Mutation.delete(
        null,
        { id },
        {
          services,
          models,
        }
      );
      expect(recipeService.deleteRecipe).toHaveBeenCalledWith(
        id,
        models.Recipe
      );
    });

    it('should call rejectRecipe from recipeService on reject mutation with the correct params', () => {
      recipeResolvers.Mutation.reject(
        null,
        { id },
        {
          services,
          models,
        }
      );
      expect(recipeService.rejectRecipe).toHaveBeenCalledWith(
        id,
        models.NewRecipe
      );
    });

    it('should call rateRecipe from recipeService on rate mutation with the correct params', () => {
      recipeResolvers.Mutation.rate(
        null,
        { input: { recipeId: id, rating: 3 } },
        {
          services,
          models,
          user,
        }
      );
      expect(recipeService.rateRecipe).toHaveBeenCalledWith(
        id,
        3,
        models.Recipe,
        user._id
      );
    });

    it('should call favoriteRecipe from recipeService on favorite mutation with the correct params', () => {
      recipeResolvers.Mutation.favorite(
        null,
        { id },
        {
          services,
          models,
          user,
        }
      );
      expect(recipeService.favoriteRecipe).toHaveBeenCalledWith(
        id,
        models.Recipe,
        user._id
      );
    });

    it('should call updateRecipe from recipeService on update mutation with the correct params', () => {
      const recipe = { data: 'yo' };
      recipeResolvers.Mutation.update(
        null,
        { input: { recipe, recipeId: id } },
        {
          services,
          models,
        }
      );
      expect(recipeService.updateRecipe).toHaveBeenCalledWith(
        recipe,
        id,
        models.Recipe
      );
    });

    it('should call submitForApproval from recipeService on submit mutation with the correct params', () => {
      const input = { data: 'yo' };
      recipeResolvers.Mutation.submit(
        null,
        { input },
        {
          services,
          models,
        }
      );
      expect(recipeService.submitRecipeForApproval).toHaveBeenCalledWith(
        input,
        models.NewRecipe
      );
    });

    it('should call approveRecipe from recipeService on approve mutation with the correct params', () => {
      const recipe = { data: 'yo' };
      recipeResolvers.Mutation.approve(
        null,
        { input: { approvalId: id, recipe } },
        {
          services,
          models,
        }
      );
      expect(recipeService.approveRecipe).toHaveBeenCalledWith(
        id,
        recipe,
        models.Recipe,
        models.NewRecipe
      );
    });
  });
});
