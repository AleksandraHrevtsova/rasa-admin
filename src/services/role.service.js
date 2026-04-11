import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, CREATE, UPDATE, DEACTIVATE } = ENDPOINTS.API.ROLES;

export const getRoles = async (params) => {
  return api.get(LIST, { params });
};