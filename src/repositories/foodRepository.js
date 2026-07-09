import prisma from '../lib/prisma';

export const foodRepository = {
  findById(id) {
    return prisma.food.findUnique({
      where: { id },
      include: { restaurant: true, category: true },
    });
  },
  listByRestaurant(restaurantId) {
    return prisma.food.findMany({
      where: { restaurantId, available: true },
      include: { category: true },
      orderBy: { id: 'asc' },
    });
  },
  popular(take = 8) {
    return prisma.food.findMany({
      where: { available: true },
      include: { restaurant: true, category: true },
      orderBy: { id: 'desc' },
      take,
    });
  },
  findManyByIds(ids) {
    return prisma.food.findMany({ where: { id: { in: ids } } });
  },
};
