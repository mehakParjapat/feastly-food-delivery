import { categoryService } from '../services/categoryService';
import { success } from '../utils/apiResponse';

export const categoryController = {
  async list() {
    const data = await categoryService.list();
    return success(data, 'Categories fetched');
  },
};
