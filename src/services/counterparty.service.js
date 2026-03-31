import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.COUNTERPARTIES;

export const getCounterparties = async () => {
  const { data } = await api.get(LIST);
  return data;
};