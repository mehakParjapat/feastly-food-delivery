import { z } from 'zod';

export const createOrderSchema = z.object({
  restaurantId: z.number().int().nullable().optional(),
  deliveryName: z.string().min(2, 'Name required'),
  deliveryPhone: z.string().min(5, 'Phone required'),
  deliveryAddress: z.string().min(5, 'Address required'),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        foodId: z.number().int(),
        quantity: z.number().int().min(1),
        price: z.number(),
      })
    )
    .min(1, 'Cart is empty'),
});
