import { restaurantController } from '../../../controllers/restaurantController';
import { withErrorHandler } from '../../../utils/handler';

export const GET = withErrorHandler(() => restaurantController.cuisines());
