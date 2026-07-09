import prisma from '../lib/prisma';

export const restaurantRepository = {
  async list({ search, cuisine, skip = 0, take = 12 }) {
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { cuisine: { contains: search } },
      ];
    }
    if (cuisine) where.cuisine = cuisine;

    const [items, total] = await Promise.all([
      prisma.restaurant.findMany({ where, skip, take, orderBy: { rating: 'desc' } }),
      prisma.restaurant.count({ where }),
    ]);
    return { items, total };
  },
  findById(id) {
    return prisma.restaurant.findUnique({
      where: { id },
      include: {
        foods: {
          where: { available: true },
          include: { category: true },
          orderBy: { id: 'asc' },
        },
      },
    });
  },
  featured(take = 6) {
    return prisma.restaurant.findMany({ take, orderBy: { rating: 'desc' } });
  },
  cuisines() {
    return prisma.restaurant.findMany({
      select: { cuisine: true },
      distinct: ['cuisine'],
      where: { cuisine: { not: null } },
    });
  },
};
