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

export const createUser = (newUserData) => {
  return api.post(CREATE, newUserData);
};

export const updateUser = (id, updatedUserData) => {
  return api.put(withId(UPDATE, id), updatedUserData);
};

export const deactivateUser = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateUser = (id) => {
  return api.post(withId(ACTIVATE, id));
};
