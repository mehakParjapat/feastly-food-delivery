import { categoryController } from '../../../controllers/categoryController';
import { withErrorHandler } from '../../../utils/handler';

export const GET = withErrorHandler(() => categoryController.list());
