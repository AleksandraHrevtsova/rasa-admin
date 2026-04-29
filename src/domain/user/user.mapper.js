export const mapFromApi = (u) => {
  return {
    name: u.name,
    email: u.email,
    phone: u.phone,
    roleId: u.role?.id || null,
    counterpartyId: u.counterparty?.id || null,
    hubIds: u.userHubs?.map(({ hub }) => hub.id) || [],
  }
};

export const mapToApi = (f) => {
  return {
    name: f.name,
    email: f.email,
    phone: f.phone,
    roleId: f.roleId,
    counterpartyId: f.counterpartyId || null,
    hubIds: f.hubIds || [],
    password: f.password,
  }
};