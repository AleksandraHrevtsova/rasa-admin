export const normalizeCounterparty = (obj) => {

  return {
    name: obj.name ?? '',
    namePublic: obj.namePublic ?? '',

    requisiteMode: obj.requisiteMode ?? 'TARGET_ONLY',
    weeklyLimit: obj.weeklyLimit ?? null,
    
    paymentTypeIds: (obj.paymentTypeIds ?? []).slice().sort(),
    productIds: (obj.productIds ?? []).slice().sort(),
  }
};