import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.COUNTERPARTIES;

const withId = (url, id) => url.replace(':id', id);

export const getCounterparties = (params) => {
  return api.get(LIST, { params });
};

export const getCounterpartyById = (id) => {
  return api.get(withId(GET, id));
};

export const createCounterparty = (payload) => {
  return api.post(CREATE, payload);
};

export const updateCounterparty = (id, payload) => {
  return api.put(withId(UPDATE, id), payload);
};

export const deactivateCounterparty = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateCounterparty = (id) => {
  return api.post(withId(ACTIVATE, id));
};