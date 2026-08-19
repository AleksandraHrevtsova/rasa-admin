import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.ORDERS;

const withId = (url, id) => url.replace(':id', id);

export const getOrders = (params) => {
  return api.get(LIST, { params });
};

export const getOrderById = (id) => {
  return api.get(withId(GET, id));
};

export const createOrder = (payload) => {
  return api.post(CREATE, payload);
};

export const updateOrder = (id, payload) => {
  return api.put(withId(UPDATE, id), payload);
};

export const deactivateOrder = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateOrder = (id) => {
  return api.post(withId(ACTIVATE, id));
};