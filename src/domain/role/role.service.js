import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.ROLES;

export const getRoles = async (params) => {
  return api.get(LIST, { params });
};