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

export const createProduct = (payload) => {
  return api.post(CREATE, payload);
};

export const updateProduct = (id, payload) => {
  return api.put(withId(UPDATE, id), payload);
};

export const deactivateProduct = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateProduct = (id) => {
  return api.post(withId(ACTIVATE, id));
};
