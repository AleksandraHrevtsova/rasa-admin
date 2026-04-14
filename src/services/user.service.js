import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.USERS;

const withId = (url, id) => url.replace(':id', id);

export const getUsers = (params = {}) => {
  return api.get(LIST, { params });
};

export const getUserById = (id) => {
  return api.get(withId(GET, id));
};

export const createUser = (payload) => {
  return api.post(CREATE, payload);
};

export const updateUser = (id, payload) => {
  return api.put(withId(UPDATE, id), payload);
};

export const deactivateUser = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateUser = (id) => {
  return api.post(withId(ACTIVATE, id));
};
