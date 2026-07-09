import { authController } from '../../../../controllers/authController';
import { withErrorHandler } from '../../../../utils/handler';

export const GET = withErrorHandler((request) => authController.profile(request));
export const PUT = withErrorHandler((request) => authController.updateProfile(request));
