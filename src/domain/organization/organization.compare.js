export const normalizeOrganization = (obj) => ({
  name: obj.name ?? '',
  code: obj.code ?? '',
  validFrom: obj.validFrom ?? null,
  validTo: obj.validTo ?? null,
  counterpartyId: obj.counterparty?.id ?? null,
  hubIds: (obj.hubIds ?? []).slice().sort(),
});