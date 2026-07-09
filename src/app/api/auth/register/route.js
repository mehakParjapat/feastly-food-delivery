import { authController } from '../../../../controllers/authController';
import { withErrorHandler } from '../../../../utils/handler';

export const POST = withErrorHandler((request) => authController.register(request));
