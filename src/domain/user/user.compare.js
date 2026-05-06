export const normalizeUser = (obj) => ({
  name: obj.name ?? '',
  email: obj.email ?? '',
  phone: obj.phone ?? '',
  roleId: obj.roleId ?? null,
  counterpartyId: obj.counterparty?.id ?? null,
  hubIds: (obj.hubIds ?? []).slice().sort(),
});