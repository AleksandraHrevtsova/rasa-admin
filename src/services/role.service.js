import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.ROLES;

export const getRoles = async () => {
  const { data } = await api.get(LIST);
  return data;
};