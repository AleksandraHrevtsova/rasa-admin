import api from '../../core/api/apiClient';
import { ENDPOINTS } from '../../config/constants';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.COUNTERPARTIES;

export const getCounterparties = (params) => {
  return api.get(LIST, { params });
};