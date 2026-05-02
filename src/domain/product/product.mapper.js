export const mapProductFromApi = (obj) => {
  return {
    name: obj.name,
    namePublic: obj.namePublic,
    sku: obj.sku || null,
    netto: obj.netto,
    brutto: obj.brutto || null,

    unitsInOneBox: obj.unitsInOneBox || null,
    unitsInOnePalletRegular: obj.unitsInOnePalletRegular || null,
    unitsInOnePalletMin: obj.unitsInOnePalletMin || null,

    boxesInOnePalletRegular: obj.boxesInOnePalletRegular || null,
    boxesInOnePalletMin: obj.boxesInOnePalletMin || null,

    unitsOverOnePallet: obj.unitsOverOnePallet || null,
    boxesOverOnePallet: obj.boxesOverOnePallet || null,
  }
};

export const mapProductToApi = (obj) => {
  return {
    name: obj.name,
    namePublic: obj.namePublic,
    sku: obj.sku || null,
    netto: obj.netto,
    brutto: obj.brutto || null,

    unitsInOneBox: obj.unitsInOneBox || null,
    unitsInOnePalletRegular: obj.unitsInOnePalletRegular || null,
    unitsInOnePalletMin: obj.unitsInOnePalletMin || null,

    boxesInOnePalletRegular: obj.boxesInOnePalletRegular || null,
    boxesInOnePalletMin: obj.boxesInOnePalletMin || null,

    unitsOverOnePallet: obj.unitsOverOnePallet || null,
    boxesOverOnePallet: obj.boxesOverOnePallet || null,
  }
};