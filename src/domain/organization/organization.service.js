import api from '@/core/api/apiClient';
import { ENDPOINTS } from '@/config/constants';

const { LIST, GET, CREATE, UPDATE, DEACTIVATE, ACTIVATE } = ENDPOINTS.API.ORGANIZATIONS;

const withId = (url, id) => url.replace(':id', id);

export const getOrganizations = (params = {}) => {
  return api.get(LIST, { params });
};

export const getOrganizationById = (id) => {
  return api.get(withId(GET, id));
};

export const createOrganization = (payload) => {
  return api.post(CREATE, payload);
};

export const updateOrganization = (id, payload) => {
  return api.put(withId(UPDATE, id), payload);
};

export const deactivateOrganization = (id) => {
  return api.post(withId(DEACTIVATE, id));
};

export const activateOrganization = (id) => {
  return api.post(withId(ACTIVATE, id));
};