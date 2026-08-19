import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { ROLES } = ENDPOINTS.API.REFS;

export const getRoles = async (params) => {
  return api.get(ROLES, { params });
};