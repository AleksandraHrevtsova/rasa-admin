const apiPath = '/api/';
const authPath = 'auth';
const receiptsPath = 'receipts';
const usersPath = 'users';
const rolesPath = 'roles';
const counterpartiesPath = 'counterparties';

export const ENDPOINTS = {
  API: {
    AUTH: {
      LOGIN: apiPath + authPath + '/login',
      LOGOUT: apiPath + authPath + '/logout',
      ME: apiPath + authPath + '/me',
    },
    RECEIPTS: {
      UPLOAD: apiPath + receiptsPath,
      LIST: apiPath + receiptsPath + '/list',
      GET: apiPath + receiptsPath + '/:id',
    },
    USERS: {
      LIST: apiPath + usersPath,
      GET: apiPath + usersPath + '/:id',
      CREATE: apiPath + usersPath,
      UPDATE: apiPath + usersPath + '/:id',
      DEACTIVATE: apiPath + usersPath + '/:id/deactivate',
    },
    ROLES: {
      LIST: apiPath + rolesPath,
      CREATE: apiPath + rolesPath,
      UPDATE: apiPath + rolesPath + '/:id',
      DEACTIVATE: apiPath + rolesPath + '/:id/deactivate',
    },
    COUNTERPARTIES: {
      LIST: apiPath + counterpartiesPath,
      CREATE: apiPath + counterpartiesPath,
      UPDATE: apiPath + counterpartiesPath + '/:id',
      DEACTIVATE: apiPath + counterpartiesPath + '/:id/deactivate',
    },
  },
  ADMIN: {
    TRANSLATIONS: {
      UPLOAD: '/admin/translations',
      LIST: '/admin/translations/list',
      GET: '/admin/translations/:id',
    }
  }
};
