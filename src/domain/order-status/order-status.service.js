import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { ORDER_STASUSES } = ENDPOINTS.API.REFS;

export const getOrderStatuses = async (params) => {
  return api.get(ORDER_STASUSES, { params });
};