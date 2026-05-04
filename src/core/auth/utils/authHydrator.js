import { getMe } from '@/core/auth/services/auth.service';

let cachedUser = null;

export const hydrateAuth = async () => {
  if (cachedUser) return cachedUser;

  try {
    const user = await getMe();
    cachedUser = user;
    return user;
  } catch (e) {
    // retry once
    await new Promise((r) => setTimeout(r, 300));

    const user = await getMe();
    cachedUser = user;
    return user;
  }
};

export const clearAuthCache = () => {
  cachedUser = null;
};