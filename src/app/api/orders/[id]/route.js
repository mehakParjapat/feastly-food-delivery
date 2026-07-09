import { orderController } from '../../../../controllers/orderController';
import { withErrorHandler } from '../../../../utils/handler';

export const GET = withErrorHandler(async (request, { params }) => {
  const { id } = await params;
  return orderController.getById(request, id);
});
