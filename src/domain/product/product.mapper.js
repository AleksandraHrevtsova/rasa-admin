export const productMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      id: data.id,
      name: data.name,
      namePublic: data.namePublic,
      sku: data.sku,
      isActive: data.isActive,

      // weight
      netto: data.weight?.netto ?? null,
      brutto: data.weight?.brutto ?? null,

      // packaging
      unitsInOneBox: data.packaging?.unitsInOneBox ?? null,
      boxesInOnePalletRegular: data.packaging?.boxesInOnePalletRegular ?? null,
      boxesInOnePalletMin: data.packaging?.boxesInOnePalletMin ?? null,

      // pallet
      unitsInOnePalletRegular: data.pallet?.unitsInOnePalletRegular ?? null,
      unitsInOnePalletMin: data.pallet?.unitsInOnePalletMin ?? null,
      unitsOverOnePallet: data.pallet?.unitsOverOnePallet ?? null,
      boxesOverOnePallet: data.pallet?.boxesOverOnePallet ?? null,
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      namePublic: form.namePublic,
      sku: form.sku,

      weight: {
        netto: form.netto ?? null,
        brutto: form.brutto ?? null,
      },

      packaging: {
        unitsInOneBox: form.unitsInOneBox ?? null,
        boxesInOnePalletRegular: form.boxesInOnePalletRegular ?? null,
        boxesInOnePalletMin: form.boxesInOnePalletMin ?? null,
      },

      pallet: {
        unitsInOnePalletRegular: form.unitsInOnePalletRegular ?? null,
        unitsInOnePalletMin: form.unitsInOnePalletMin ?? null,
        unitsOverOnePallet: form.unitsOverOnePallet ?? null,
        boxesOverOnePallet: form.boxesOverOnePallet ?? null,
      },
    };
  },
};