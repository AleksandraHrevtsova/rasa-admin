const toNumber = (value) => {
  if (value === '' || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeProduct = (obj) => ({
  name: obj.name ?? '',
  namePublic: obj.namePublic ?? '',
  sku: obj.sku ?? '',
  netto: toNumber(obj.netto),
  brutto: toNumber(obj.brutto),

  unitsInOneBox: toNumber(obj.unitsInOneBox),
  unitsInOnePalletRegular: toNumber(obj.unitsInOnePalletRegular),
  unitsInOnePalletMin: toNumber(obj.unitsInOnePalletMin),

  boxesInOnePalletRegular: toNumber(obj.boxesInOnePalletRegular),
  boxesInOnePalletMin: toNumber(obj.boxesInOnePalletMin),

  unitsOverOnePallet: toNumber(obj.unitsOverOnePallet),
  boxesOverOnePallet: toNumber(obj.boxesOverOnePallet),
});