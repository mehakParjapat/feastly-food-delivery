import { authService } from '../services/authService';
import { registerSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '../validators/authValidator';
import { success, failure } from '../utils/apiResponse';
import { requireAuth } from '../middlewares/auth';

export const authController = {
  async register(request) {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return failure('Validation failed', 422, parsed.error.flatten().fieldErrors);
    const result = await authService.register(parsed.data);
    return success(result, 'Registered successfully', 201);
  },

  async login(request) {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return failure('Validation failed', 422, parsed.error.flatten().fieldErrors);
    const result = await authService.login(parsed.data);
    return success(result, 'Logged in successfully');
  },

  async profile(request) {
    const auth = requireAuth(request);
    const user = await authService.profile(auth.id);
    return success(user, 'Profile fetched');
  },

  async updateProfile(request) {
    const auth = requireAuth(request);
    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) return failure('Validation failed', 422, parsed.error.flatten().fieldErrors);
    const user = await authService.updateProfile(auth.id, parsed.data);
    return success(user, 'Profile updated');
  },

  async changePassword(request) {
    const auth = requireAuth(request);
    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);
    if (!parsed.success) return failure('Validation failed', 422, parsed.error.flatten().fieldErrors);
    await authService.changePassword(auth.id, parsed.data);
    return success(null, 'Password changed');
  },
};
