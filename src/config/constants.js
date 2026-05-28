const apiPath = '/api';
const createNewPath = '/new';

const pathRoutes = {
  getAll: '/',
  getById: '/:id',
  create: '/',
  update: '/:id',
  deactivate: '/:id/deactivate',
  activate: '/:id/activate'
};

export const pageTags = {
  login: 'login',
  users: 'users',
  user: 'user',
  products: 'products',
  product: 'product',
  counterparties: 'counterparties',
  counterparty: 'counterparty',
  paymentTypes: 'payment-types',
  paymentType: 'payment-type',
  roles: 'roles',
  role: 'role',
  orders: 'orders',
  order: 'order',
  receipts: 'receipts',
  organizations: 'organizations',
  organization: 'organization',
  requisites: 'requisites',
  certificates: 'certificates',
};

const authPath = '/auth';
const loginPath = '/' + pageTags.login;
const logoutPath = '/logout';
const getMePath = '/me';

const receiptsPath = '/' + pageTags.receipts;
const usersPath = '/' + pageTags.users;
const rolesPath = '/' + pageTags.roles;
const paymentTypesPath = '/' + pageTags.paymentTypes;
const counterpartiesPath = '/' + pageTags.counterparties;
const productsPath = '/' + pageTags.products;
const organizationsPath = '/' + pageTags.organizations;
const requisitesPath = '/' + pageTags.requisites;
const ordersPath = '/' + pageTags.orders;
const certificatesPath = '/' + pageTags.certificates;

export const ENDPOINTS = {
  API: {
    AUTH: {
      LOGIN: apiPath + authPath + loginPath,
      LOGOUT: apiPath + authPath + logoutPath,
      ME: apiPath + authPath + getMePath,
    },
    RECEIPTS: {
      LIST: apiPath + receiptsPath,
      GET: apiPath + receiptsPath + pathRoutes.getById,
      UPLOAD: apiPath + receiptsPath,
    },
    USERS: {
      LIST: apiPath + usersPath,
      GET: apiPath + usersPath + pathRoutes.getById,
      CREATE: apiPath + usersPath,
      UPDATE: apiPath + usersPath + pathRoutes.update,
      DEACTIVATE: apiPath + usersPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + usersPath + pathRoutes.activate,
    },
    ROLES: {
      LIST: apiPath + rolesPath,
      GET: apiPath + rolesPath + pathRoutes.getById,
      CREATE: apiPath + rolesPath,
      UPDATE: apiPath + rolesPath + pathRoutes.update,
      DEACTIVATE: apiPath + rolesPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + rolesPath + pathRoutes.activate,
    },
    PAYMENT_TYPES: {
      LIST: apiPath + paymentTypesPath,
      GET: apiPath + paymentTypesPath + pathRoutes.getById,
      CREATE: apiPath + paymentTypesPath,
      UPDATE: apiPath + paymentTypesPath + pathRoutes.update,
      DEACTIVATE: apiPath + paymentTypesPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + paymentTypesPath + pathRoutes.activate,
    },
    COUNTERPARTIES: {
      LIST: apiPath + counterpartiesPath,
      GET: apiPath + counterpartiesPath + pathRoutes.getById,
      CREATE: apiPath + counterpartiesPath,
      UPDATE: apiPath + counterpartiesPath + pathRoutes.update,
      DEACTIVATE: apiPath + counterpartiesPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + counterpartiesPath + pathRoutes.activate,
    },
    PRODUCTS: {
      LIST: apiPath + productsPath,
      GET: apiPath + productsPath + pathRoutes.getById,
      CREATE: apiPath + productsPath,
      UPDATE: apiPath + productsPath + pathRoutes.update,
      DEACTIVATE: apiPath + productsPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + productsPath + pathRoutes.activate,
    },
    ORGANIZATIONS: {
      LIST: apiPath + organizationsPath,
      GET: apiPath + organizationsPath + pathRoutes.getById,
      CREATE: apiPath + organizationsPath,
      UPDATE: apiPath + organizationsPath + pathRoutes.update,
      DEACTIVATE: apiPath + organizationsPath + pathRoutes.deactivate,
      ACTIVATE: apiPath + organizationsPath + pathRoutes.activate,
    },
  },
  ADMIN: {
    TRANSLATIONS: {
      UPLOAD: '/admin/translations',
      LIST: '/admin/translations',
      GET: '/admin/translations/:id',
    }
  }
};

export const NAV = {
  home: '/',
  login: loginPath,

  users: usersPath,
  editUser: usersPath + pathRoutes.update,
  newUser: usersPath + createNewPath,

  roles: rolesPath,
  
  products: productsPath,
  editProduct: productsPath + pathRoutes.update,
  newProduct: productsPath + createNewPath,

  counterparties: counterpartiesPath,
  editCounterparty: counterpartiesPath + pathRoutes.update,
  newCounterparty: counterpartiesPath + createNewPath,

  hubs: '/hubs',
  editHub: '/hubs' + + pathRoutes.update,
  newHub: '/hubs' + createNewPath,

  paymentTypes: paymentTypesPath,
  editPaymentType: paymentTypesPath + pathRoutes.update,
  newPaymentType: paymentTypesPath + createNewPath,

  organizations: organizationsPath,
  editOrganization: organizationsPath + pathRoutes.update,
  newOrganization: organizationsPath + createNewPath,

  requisites: requisitesPath,
  editRequisites: requisitesPath + pathRoutes.update,
  newRequisites: requisitesPath + createNewPath,

  orders: ordersPath,
  editOrder: ordersPath + pathRoutes.update,
  newOrder: requisitesPath + createNewPath,

  payments: receiptsPath,
  certificates: certificatesPath,
};

export const buttonActionTypes = {
  submit: 'submit',
  create: 'create',
  activate: 'activate',
  deactivate: 'deactivate',
  show: 'show',
  ghost: 'ghost',
  edit: 'edit',
  close: 'close',
  toggle: 'toggle',
};

export const submitActions = {
  save: 'save',
  saveAndBack: 'save_and_back',
};

export const formItemTypes = {
  select: 'select',
  input: {
    text: 'text',
    tel: 'tel',
    email: 'email',
    password: 'password',
    number: 'number',
    checkbox: 'checkbox',
    radio: 'radio',
    file: 'file',
    range: 'range',
    date: 'date',
    color: 'color',
  },
  group: {
    checkbox: 'checkbox',
    radio: 'radio',
  }
};

export const compositeTypes = {
  group: 'group',
  grid: 'grid',
  row: 'row',
  manager: 'manager',
};

export const compositeBlocks = {
  hubs: 'hubs-manager',
  paymentTypes: 'payment-types-manager',
  products: 'products-manager',
  organizations: 'organizations-manager',
  employees: 'employees-manager',
};

export const defaultValues = {
  table: '—',
};