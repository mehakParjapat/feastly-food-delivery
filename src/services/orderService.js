import { orderRepository } from '../repositories/orderRepository';
import { foodRepository } from '../repositories/foodRepository';

const DELIVERY_FEE = 2.99;

export const orderService = {
  async create(userId, payload) {
    const ids = payload.items.map((i) => i.foodId);
    const foods = await foodRepository.findManyByIds(ids);
    const foodMap = new Map(foods.map((f) => [f.id, f]));

    let subtotal = 0;
    const itemsData = payload.items.map((i) => {
      const food = foodMap.get(i.foodId);
      if (!food) {
        const err = new Error(`Food ${i.foodId} not found`);
        err.status = 400;
        throw err;
      }
      const price = Number(food.price);
      subtotal += price * i.quantity;
      return { foodId: i.foodId, quantity: i.quantity, price };
    });

    const total = subtotal + DELIVERY_FEE;

    return orderRepository.create({
      userId,
      restaurantId: payload.restaurantId || null,
      status: 'PENDING',
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      deliveryName: payload.deliveryName,
      deliveryPhone: payload.deliveryPhone,
      deliveryAddress: payload.deliveryAddress,
      notes: payload.notes || null,
      items: { create: itemsData },
    });
  },

  listByUser(userId) {
    return orderRepository.listByUser(userId);
  },

  async getById(userId, id) {
    const order = await orderRepository.findById(id);
    if (!order || order.userId !== userId) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }
    return order;
  },
};
