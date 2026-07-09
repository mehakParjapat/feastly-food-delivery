import { foodController } from '../../../../controllers/foodController';
import { withErrorHandler } from '../../../../utils/handler';

export const GET = withErrorHandler(async (request, { params }) => {
  const { id } = await params;
  return foodController.getById(id);
});
