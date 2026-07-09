import { foodController } from '../../../../controllers/foodController';
import { withErrorHandler } from '../../../../utils/handler';

export const GET = withErrorHandler(() => foodController.popular());
