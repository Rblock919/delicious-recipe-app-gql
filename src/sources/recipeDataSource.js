const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class RecipeAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.RECIPE_API;
  }

  async getAllUsers() {
    return await this.get('admin/users');
  }

  async getAllUnapprovedRecipes() {
    return await this.get('admin/approval')
  }

  async getUnapprovedRecipe(id) {
    return await this.get(`admin/approval/${id}`)
  }

  async getAllRecipes() {
    return await this.get('recipes');
  }

  async getRecipe(id) {
    return await this.get(`recipes/${id}`);
  }

};

