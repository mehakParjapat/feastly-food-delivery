import { foodService } from '../services/foodService';
import { success } from '../utils/apiResponse';

export const foodController = {
  async getById(id) {
    const food = await foodService.getById(Number(id));
    return success(food, 'Food fetched');
  },

  async popular() {
    const data = await foodService.popular();
    return success(data, 'Popular foods fetched');
  },
};
