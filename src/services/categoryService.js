import { categoryRepository } from '../repositories/categoryRepository';

export const categoryService = {
  list() {
    return categoryRepository.list();
  },
};
