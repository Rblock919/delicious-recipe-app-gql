function assembleRecipe(recipe) {
  const returnRecipe = {};

  returnRecipe.title = recipe.title;
  returnRecipe.producer = recipe.producer;
  returnRecipe.raters = {};
  returnRecipe.favoriters = [];
  returnRecipe.steps = [];
  returnRecipe.ingredients = [];
  returnRecipe.imgDir = recipe.imgDir;
  returnRecipe.preCook = recipe.preCook || [];
  returnRecipe.nutrition = {
    calories: recipe.calories,
    fat: recipe.fat || '',
    protein: recipe.protein || '',
    carbohydrate: recipe.carbohydrate || '',
    saturatedFat: recipe.saturatedFat || '',
    sugar: recipe.sugar || '',
    fiber: recipe.fiber || '',
    cholesterol: recipe.cholesterol || '',
    sodium: recipe.sodium || ''
  };

  for (let i = 0; i < recipe.stepnames.length; i++) {
    const step = {
      name: recipe.stepnames[i],
      body: recipe.stepbodies[i]
    };
    returnRecipe.steps.push(step);
  }
  for (let i = 0; i < recipe.ingredientnames.length; i++) {
    const ingredient = {
      name: recipe.ingredientnames[i],
      amount: recipe.ingredientamounts[i]
    };
    returnRecipe.ingredients.push(ingredient);
  }

  return returnRecipe;
}

module.exports = assembleRecipe;
