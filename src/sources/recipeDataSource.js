const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class RecipeAPI extends RESTDataSource {

  constructor() {
    super();
    this.baseURL = process.env.RECIPE_API;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAllUsers() {
    return await this.get('admin/users');
  }

  async updateUsers(users) {
    console.log(`users: ${JSON.stringify(users)}`);
    return await this.post('admin/updateUsers', users);
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

  async deleteRecipe(id) {
    return await this.delete(`recipes/delete/${id}`)
  }

  async rejectRecipe(id) {
    return await this.delete(`recipes/reject/${id}`);
  }

  async submitForApproval(recipe) {
    const data = {recipe};
    return await this.post('recipes/submit', data);
  }

  async addRecipe(recipe, approvalId) {
    const data = {recipe, approvalId};
    return await this.post('recipes/add', data);
  }

  async updateRecipe(recipe) {
    const data = {recipe};
    return await this.patch('recipes/update', data);
  }

  async favoriteRecipe(recipeInfo) {
    return await this.post('recipes/favorite', recipeInfo);
  }

  async rateRecipe(recipeInfo) {
    return await this.post('recipes/rate', recipeInfo);
  }

  async signIn(user) {
    return await this.post('auth/signIn', user);
  }

  async signUp(userInfo) {
    return await this.post('auth/signUp', userInfo);
  }

  async signOut() {
    return await this.get('auth/signOut');
  }

  async getUserData() {
    return await this.get('auth/getUserData');
  }

};

