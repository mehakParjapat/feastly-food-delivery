import { foodRepository } from '../repositories/foodRepository';

export const foodService = {
  async getById(id) {
    const food = await foodRepository.findById(id);
    if (!food) {
      const err = new Error('Food not found');
      err.status = 404;
      throw err;
    }
    return food;
  },
  listByRestaurant(restaurantId) {
    return foodRepository.listByRestaurant(restaurantId);
  },
  popular() {
    return foodRepository.popular();
  },
};
