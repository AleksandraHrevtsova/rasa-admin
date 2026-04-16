export const normalizeUser = (u) => ({
  name: u.name ?? '',
  email: u.email ?? '',
  phone: u.phone ?? '',
  roleId: u.roleId ?? null,
  counterpartyId: u.counterpartyId ?? null,
  hubIds: (u.hubIds ?? []).slice().sort(),
});