import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.COUNTERPARTIES;

export const getCounterparties = (params) => {
  return api.get(LIST, { params });
};