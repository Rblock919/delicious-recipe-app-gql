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
    return this.get('admin/users');
  }

  async updateUsers(users: any) {
    return this.post('admin/updateUsers', users);
  }

  async getAllUnapprovedRecipes() {
    return this.get('admin/approval');
  }

  async getUnapprovedRecipe(id: string) {
    return this.get(`admin/approval/${id}`);
  }

  async getAllRecipes() {
    return this.get('recipes');
  }

  async getRecipe(id: string) {
    return this.get(`recipes/${id}`);
  }

  async deleteRecipe(id: string) {
    return this.delete(`recipes/delete/${id}`);
  }

  async rejectRecipe(id: string) {
    return this.delete(`recipes/reject/${id}`);
  }

  async submitForApproval(recipe: any) {
    const data = { recipe };
    return this.post('recipes/submit', data);
  }

  async addRecipe(recipe: any, approvalId: string) {
    const data = { recipe, approvalId };
    return this.post('recipes/add', data);
  }

  async updateRecipe(recipe: any) {
    const data = { recipe };
    return this.patch('recipes/update', data);
  }

  async favoriteRecipe(recipeInfo: any) {
    return this.post('recipes/favorite', recipeInfo);
  }

  async rateRecipe(recipeInfo: any) {
    return this.post('recipes/rate', recipeInfo);
  }

  async signIn(user: any) {
    return this.post('auth/signIn', user);
  }

  async signUp(userInfo: any) {
    return this.post('auth/signUp', userInfo);
  }

  async signOut() {
    return this.get('auth/signOut');
  }

  async getUserData() {
    return this.get('auth/getUserData');
  }
}
