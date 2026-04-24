const apiPath = '/api/';
const authPath = 'auth';
const receiptsPath = 'receipts';
const usersPath = 'users';
const rolesPath = 'roles';
const counterpartiesPath = 'counterparties';
const productsPath = 'products';

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
      ACTIVATE: apiPath + usersPath + '/:id/activate',
    },
    ROLES: {
      LIST: apiPath + rolesPath,
      CREATE: apiPath + rolesPath,
      UPDATE: apiPath + rolesPath + '/:id',
      DEACTIVATE: apiPath + rolesPath + '/:id/deactivate',
      ACTIVATE: apiPath + rolesPath + '/:id/activate',
    },
    COUNTERPARTIES: {
      LIST: apiPath + counterpartiesPath,
      CREATE: apiPath + counterpartiesPath,
      UPDATE: apiPath + counterpartiesPath + '/:id',
      DEACTIVATE: apiPath + counterpartiesPath + '/:id/deactivate',
      ACTIVATE: apiPath + counterpartiesPath + '/:id/activate',
    },
    PRODUCTS: {
      LIST: apiPath + productsPath,
      GET: apiPath + productsPath + '/:id',
      CREATE: apiPath + productsPath,
      UPDATE: apiPath + productsPath + '/:id',
      DEACTIVATE: apiPath + productsPath + '/:id/deactivate',
      ACTIVATE: apiPath + productsPath + '/:id/activate',
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

export const NAV = {
  login: '/login',
  home: '/',

  users: '/users',
  editUser: '/users/:id',
  newUser: '/users/new',

  counterparties: '/counterparties',
  editCounterparty: '/counterparties/:id',
  newCounterparty: '/counterparties/new',

  products: '/products',
  editProduct: '/products/:id',
  newProduct: '/products/new',

  roles: '/roles',
  orders: '/orders',
  payments: '/payments',
  certificates: '/certificates',
};

export const buttonActionTypes = {
  submit: 'submit',
  create: 'create',
  activate: 'activate',
  deactivate: 'deactivate',
  show: 'show',
  ghost: 'ghost',
};

export const formItemTypes = {
  select: 'select',
  input: {
    text: 'text',
    tel: 'tel',
    email: 'email',
    password: 'password',
    number: 'number'
  },
  checkbox: 'checkbox',
  radio: 'radio',
  file: 'file',
  range: 'range',
  date: 'date',
  color: 'color',
};

export const pageTags = {
  users: 'users',
  user: 'user',
  products: 'products',
  product: 'product',
  counterparties: 'counterparties',
  counterparty: 'counterparty',
  roles: 'roles',
  role: 'role',
  orders: 'orders',
  order: 'order',
};
