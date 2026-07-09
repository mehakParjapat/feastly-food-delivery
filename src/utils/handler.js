import { failure } from './apiResponse';

export function withErrorHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      const status = err.status || 500;
      const message = err.message || 'Internal Server Error';
      return failure(message, status);
    }
  };
}
