export const normalizeUser = (u) => ({
  name: u.name ?? '',
  email: u.email ?? '',
  phone: u.phone ?? '',
  roleId: u.role?.id ?? null,
  counterpartyId: u.counterparty?.id ?? null,
  hubIds: (u.hubIds ?? []).slice().sort(),
});