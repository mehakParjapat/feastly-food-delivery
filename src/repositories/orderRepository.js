import prisma from '../lib/prisma';

export const orderRepository = {
  create(data) {
    return prisma.order.create({
      data,
      include: { items: { include: { food: true } }, restaurant: true },
    });
  },
  listByUser(userId) {
    return prisma.order.findMany({
      where: { userId },
      include: { items: { include: { food: true } }, restaurant: true },
      orderBy: { createdAt: 'desc' },
    });
  },
  findById(id) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: { include: { food: true } }, restaurant: true, user: true },
    });
  },
};
