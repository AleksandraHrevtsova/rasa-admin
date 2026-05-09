export const organizationMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      code: data.code,
      validFrom: data.validFrom,
      validTo: data.validTo || null,
      counterpartyId: data.counterparty?.id || null,
      hubIds: data.hubs?.map(({ el }) => el.id) || [],
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      code: form.code,
      validFrom: form.validFrom,
      validTo: form.validTo,
      counterpartyId: form.counterpartyId || null,
      hubIds: form.hubIds || [],
    };
  },
};