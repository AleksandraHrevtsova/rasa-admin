export const LOCALES = {
  UK: 'uk', 
  RU: 'ru',
};

export const SUPPORTED_LOCALES = Object.values(LOCALES);
export const defaultLocale = LOCALES.UK;

export const localStorageKey = 'locale';

export const keys = {
  auth: {
    title: 'auth.title',
    email: 'auth.email',
    password: 'auth.password',
    submit: 'auth.submit',
    logout: 'auth.logout',
  },
  navigation: {
    users: 'navigation.users',
    roles: 'navigation.roles',
    counterparties: 'navigation.counterparties',
    hubs: 'navigation.hubs',
    products: 'navigation.products',
    orders: 'navigation.orders',
    payments: 'navigation.payments',
    certificates: 'navigation.certificates',
  },
  common: {
    create: 'common.create',
    edit: 'common.edit',
    activate: 'common.activate',
    deactivate: 'common.deactivate',
    
    save: 'common.save',
    cancel: 'common.cancel',
    back: 'common.back',
    
    actions: 'common.actions',
    search: 'common.search',
    select: 'common.select',
    loading: 'common.loading',
    requiredValue: 'common.requiredValue',
    
    showInactive: 'common.showInactive',
    showActive: 'common.showActive',

    title: 'common.title',
    name: 'common.name',
    baseName: 'common.baseName',
    publicName: 'common.publicName',
    phone: 'common.phone',
    email: 'common.email',
    password: 'common.password',
    passwordRequired: 'common.passwordRequired',
    role: 'common.role',
    counterparty: 'common.counterparty',
    hubs: 'common.hubs',

    products: 'common.products',
    counterparties: 'common.counterparties',

    count: 'common.count',
    enterCount: 'common.enterCount',
    toggleActiveError: 'common.toggleActiveError',
  },
  table: {
    noData: 'table.noData',
    filter: 'table.filter',
    page: 'table.page',
    of: 'table.of',
    rows: 'table.rows',
  },
  users: {
    title: 'users.title',
    roles: 'users.roles',
  },
  user: {
    selectRole: 'user.selectRole',
    selectCounterparty: 'user.selectCounterparty',
    selectHubs: 'user.selectHubs',
    enterName: 'user.enterName',
    enterPhone: 'user.enterPhone',
    enterEmail: 'user.enterEmail',
    enterPassword: 'user.enterPassword',

    roleRequired: 'user.roleRequired',
    counterpartyRequired: 'user.counterpartyRequired',
    hubsRequired: 'user.hubsRequired',
    nameRequired: 'user.nameRequired',
    phoneRequired: 'user.phoneRequired',
    incorrectPhone: 'user.incorrectPhone',
    emailRequired: 'user.emailRequired',
    incorrectEmail: 'user.incorrectEmail',
    passwordMinLength: 'user.passwordMinLength',
    
    editCurrent: 'user.editCurrent',
    createNew: 'user.createNew',
    
    confirmDeactivate: 'user.confirmDeactivate',
    updated: 'user.updated',
    created: 'user.created',
    activated: 'user.activated',
    deactivated: 'user.deactivated',

    updateError: 'user.updateError',
    createError: 'user.createError',
  },
  products: {
    title: 'products.title',
  },
  product: {
    name: 'product.name',

    sku: 'product.sku',
    netto: 'product.netto',
    brutto: 'product.brutto',

    unitsInOneBox: 'product.unitsInOneBox',
    unitsInOnePalletRegular: 'product.unitsInOnePalletRegular',
    unitsInOnePalletMin: 'product.unitsInOnePalletMin',

    boxesInOnePalletRegular: 'product.boxesInOnePalletRegular',
    boxesInOnePalletMin: 'product.boxesInOnePalletMin',

    unitsOverOnePallet: 'product.unitsOverOnePallet',
    boxesOverOnePallet: 'product.boxesOverOnePallet',

    enterSku: 'product.enterSku',
    enterNetto: 'product.enterNetto',
    enterBrutto: 'product.enterBrutto',


    editCurrent: 'product.editCurrent',
    createNew: 'product.createNew',
    
    confirmDeactivate: 'product.confirmDeactivate',
    updated: 'product.updated',
    created: 'product.created',
    activated: 'product.activated',
    deactivated: 'product.deactivated',

    updateError: 'product.updateError',
    createError: 'product.createError',
  },
  counterparties: {
    title: 'counterparties.title',
  },
  counterparty: {
    updateError: 'counterparty.updateError',
    createError: 'counterparty.createError',
  },
}