import { orderController } from '../../../controllers/orderController';
import { withErrorHandler } from '../../../utils/handler';

export const GET = withErrorHandler((request) => orderController.list(request));
export const POST = withErrorHandler((request) => orderController.create(request));
