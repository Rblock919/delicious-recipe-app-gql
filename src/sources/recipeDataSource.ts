import { RESTDataSource } from 'apollo-datasource-rest';

export default class RecipeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.RECIPE_API;
  }

  willSendRequest(request: any) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAllUsers() {
    return await this.get('admin/users');
  }

  async updateUsers(users: any) {
    console.log(`users: ${JSON.stringify(users)}`);
    return await this.post('admin/updateUsers', users);
  }

  async getAllUnapprovedRecipes() {
    return await this.get('admin/approval');
  }

  async getUnapprovedRecipe(id: string) {
    return await this.get(`admin/approval/${id}`);
  }

  async getAllRecipes() {
    return await this.get('recipes');
  }

  async getRecipe(id: string) {
    return await this.get(`recipes/${id}`);
  }

  async deleteRecipe(id: string) {
    return await this.delete(`recipes/delete/${id}`);
  }

  async rejectRecipe(id: string) {
    return await this.delete(`recipes/reject/${id}`);
  }

  async submitForApproval(recipe: any) {
    const data = { recipe };
    return await this.post('recipes/submit', data);
  }

  async addRecipe(recipe: any, approvalId: string) {
    const data = { recipe, approvalId };
    return await this.post('recipes/add', data);
  }

  async updateRecipe(recipe: any) {
    const data = { recipe };
    return await this.patch('recipes/update', data);
  }

  async favoriteRecipe(recipeInfo: any) {
    return await this.post('recipes/favorite', recipeInfo);
  }

  async rateRecipe(recipeInfo: any) {
    return await this.post('recipes/rate', recipeInfo);
  }

  async signIn(user: any) {
    return await this.post('auth/signIn', user);
  }

  async signUp(userInfo: any) {
    return await this.post('auth/signUp', userInfo);
  }

  async signOut() {
    return await this.get('auth/signOut');
  }

  async getUserData() {
    return await this.get('auth/getUserData');
  }
}
