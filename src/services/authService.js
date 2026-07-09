import { userRepository } from '../repositories/userRepository';
import { hashPassword, verifyPassword } from '../lib/hash';
import { signToken } from '../lib/jwt';

function sanitize(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

export const authService = {
  async register({ name, email, password, phone }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }
    const hashed = await hashPassword(password);
    const user = await userRepository.create({
      name,
      email,
      password: hashed,
      phone: phone || null,
      role: 'customer',
    });
    const token = signToken({ id: user.id, email: user.email });
    return { user: sanitize(user), token };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }
    const token = signToken({ id: user.id, email: user.email });
    return { user: sanitize(user), token };
  },

  async profile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    return sanitize(user);
  },

  async updateProfile(userId, data) {
    const user = await userRepository.update(userId, data);
    return sanitize(user);
  },

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    const ok = await verifyPassword(currentPassword, user.password);
    if (!ok) {
      const err = new Error('Current password is incorrect');
      err.status = 400;
      throw err;
    }
    const hashed = await hashPassword(newPassword);
    await userRepository.update(userId, { password: hashed });
    return true;
  },
};
