import { restaurantService } from '../services/restaurantService';
import { success } from '../utils/apiResponse';

export const restaurantController = {
  async list(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const cuisine = searchParams.get('cuisine') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const data = await restaurantService.list({ search, cuisine, page, limit });
    return success(data, 'Restaurants fetched');
  },

  async getById(id) {
    const restaurant = await restaurantService.getById(Number(id));
    return success(restaurant, 'Restaurant fetched');
  },

  async cuisines() {
    const data = await restaurantService.cuisines();
    return success(data, 'Cuisines fetched');
  },
};
