import { verifyToken } from '../lib/jwt';

export function getAuthUser(request) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return decoded;
}

export function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user) {
    const err = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
  return user;
}
