import { formatDateForInput } from '@/core/utils/date.format';

export const organizationMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      code: data.code,
      validFrom: formatDateForInput(data.validFrom),
      validTo: formatDateForInput(data.validTo),
      type: data.type,
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
      type: form.type,
      counterpartyId: form.counterpartyId || null,
      hubIds: form.hubIds || [],
    };
  },
};