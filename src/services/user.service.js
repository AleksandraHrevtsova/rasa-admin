import api from '../api';
import { ENDPOINTS } from '../constants/endpoints';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.USERS;

const withId = (url, id) => url.replace(':id', id);

export const getUsers = async (params = {}) => {
  const { data } = await api.get(LIST, { params });
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(withId(GET, id));
  return data;
};

export const createUser = async (newUserData) => {
  const { data } = await api.post(CREATE, newUserData);
  return data;
};

export const updateUser = async (id, updatedUserData) => {
  const { data } = await api.put(
    withId(UPDATE, id),
    updatedUserData
  );
  return data;
};

export const deactivateUser = async (id) => {
  const { data } = await api.post(withId(DEACTIVATE, id));
  return data;
};

export const activateUser = async (id) => {
  const { data } = await api.post(withId(ACTIVATE, id));
  return data;
};
