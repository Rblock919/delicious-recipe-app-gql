import DataLoader from 'dataloader';
import * as _ from 'lodash';
import { recipeModels } from './models/recipe.model';

export const createRecipeLoader = () => {
  return new DataLoader(recipeIds => {
    console.log('in recipe loader');
    return recipeModels.Recipe.find({ _id: { $in: recipeIds } })
      .exec()
      .then(recipes => {
        console.log('recipes loader batch: ', recipeIds.length);
        const recipesById = _.keyBy(recipes, '_id');
        return recipeIds.map(recipeId => recipesById[recipeId]);
      });
  });
};

export const createNewRecipeLoader = () => {
  return new DataLoader(recipeIds => {
    return recipeModels.NewRecipe.find({ _id: { $in: recipeIds } })
      .exec()
      .then(recipes => {
        console.log('new recipes loader batch: ', recipeIds.length);
        const recipesById = _.keyBy(recipes, '_id');
        return recipeIds.map(recipeId => recipesById[recipeId]);
      });
  });
};
