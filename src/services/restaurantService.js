import { restaurantRepository } from '../repositories/restaurantRepository';

export const restaurantService = {
  async list({ search, cuisine, page = 1, limit = 12 }) {
    const skip = (page - 1) * limit;
    const { items, total } = await restaurantRepository.list({
      search,
      cuisine,
      skip,
      take: limit,
    });
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },
  async getById(id) {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) {
      const err = new Error('Restaurant not found');
      err.status = 404;
      throw err;
    }
    return restaurant;
  },
  featured() {
    return restaurantRepository.featured();
  },
  async cuisines() {
    const rows = await restaurantRepository.cuisines();
    return rows.map((r) => r.cuisine).filter(Boolean);
  },
};
