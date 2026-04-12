import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.PRODUCTS;

const withId = (url, id) => url.replace(':id', id);

export const getProducts = (params = {}) => {
  return api.get(LIST, { params });
};

export const getProductById = (id) => {
  return api.get(withId(GET, id));
};

export const createProduct = (newUserData) => {
  return api.post(CREATE, newUserData);
};

export const updateProduct = (id, updatedUserData) => {
  return api.put(withId(UPDATE, id), updatedUserData);
};

export const deactivateProduc = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateProduct = (id) => {
  return api.post(withId(ACTIVATE, id));
};
