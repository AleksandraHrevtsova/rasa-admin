export const normalizeCounterparty = (obj) => ({
  name: obj.name ?? '',
  namePublic: obj.namePublic ?? '',
  hubIds:(obj.hubIds ?? []).slice().sort(),
  productIds: (obj.productIds ?? []).slice().sort(),
  employeeIds: (obj.employeeIds ?? []).slice().sort(),
  organizationIds: (obj.organizationIds ?? []).slice().sort(),
});