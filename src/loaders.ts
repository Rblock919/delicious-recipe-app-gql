import { createRecipeLoader, createNewRecipeLoader } from './recipes';
import { createUserLoader } from './users';

export const loaders = () => {
  return {
    Recipe: createRecipeLoader(),
    NewRecipe: createNewRecipeLoader(),
    User: createUserLoader(),
  };
};
