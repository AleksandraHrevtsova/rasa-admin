import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.PAYMENT_TYPES;

export const getPaymentTypes = async (params) => {
  return api.get(LIST, { params });
};