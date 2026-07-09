import { orderService } from '../services/orderService';
import { createOrderSchema } from '../validators/orderValidator';
import { success, failure } from '../utils/apiResponse';
import { requireAuth } from '../middlewares/auth';

export const orderController = {
  async create(request) {
    const auth = requireAuth(request);
    const body = await request.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) return failure('Validation failed', 422, parsed.error.flatten().fieldErrors);
    const order = await orderService.create(auth.id, parsed.data);
    return success(order, 'Order placed', 201);
  },

  async list(request) {
    const auth = requireAuth(request);
    const orders = await orderService.listByUser(auth.id);
    return success(orders, 'Orders fetched');
  },

  async getById(request, id) {
    const auth = requireAuth(request);
    const order = await orderService.getById(auth.id, Number(id));
    return success(order, 'Order fetched');
  },
};
