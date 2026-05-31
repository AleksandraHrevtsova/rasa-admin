export const normalizeOrganization = (obj) => ({
  name: obj.name ?? '',
  code: obj.code ?? '',
  type: obj.type ?? '',
  validFrom: obj.validFrom ?? null,
  validTo: obj.validTo ?? null,
  counterpartyId: obj.counterpartyId ?? null,
});