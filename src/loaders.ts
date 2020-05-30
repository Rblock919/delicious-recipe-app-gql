import { createRecipeLoader, createNewRecipeLoader } from './recipes';

export const loaders = () => {
  return {
    Recipe: createRecipeLoader(),
    NewRecipe: createNewRecipeLoader(),
  };
};
