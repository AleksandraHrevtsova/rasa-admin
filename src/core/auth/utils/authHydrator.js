import { getMe } from '@/core/auth/services/auth.service';

let cachedUser = null;

export const hydrateAuth = async () => {
  // instant cache (UX boost)
  if (cachedUser) return cachedUser;

  const { user } = await getMe();

  cachedUser = user;

  return user;
};

export const clearAuthCache = () => {
  cachedUser = null;
};