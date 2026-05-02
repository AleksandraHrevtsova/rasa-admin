export const mapUserFromApi = (obj) => {
  return {
    name: obj.name,
    email: obj.email,
    phone: obj.phone,
    roleId: obj.role?.id || null,
    counterpartyId: obj.counterparty?.id || null,
    hubIds: obj.hubs?.map(({ el }) => el.id) || [],
  }
};

export const mapUserToApi = (obj) => {
  return {
    name: obj.name,
    email: obj.email,
    phone: obj.phone,
    roleId: obj.roleId,
    counterpartyId: obj.counterpartyId || null,
    hubIds: obj.hubIds || [],
    password: obj.password,
  }
};