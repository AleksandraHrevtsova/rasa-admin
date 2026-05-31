import { defaultValues } from '@/config/constants';

export const counterpartyMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      namePublic: data.namePublic,

      requisiteMode: data.requisiteMode ?? defaultValues.requisiteMode,
      weeklyLimit: data.weeklyLimit ?? null,

      paymentTypeIds: data.paymentTypes?.map((el) => el.id) || [],
      productIds: data.products?.map((el) => el.id) || [],
      // requisites: data.requisites?.map((el) => ({
      //   id: el.id,
      //   organizationId: el.organizationId,
      //   bankAccountId: el.bankAccountId,
      //   amountLimit: el.amountLimit,
      //   type: el.type,
      //   validFrom: el.validFrom,
      //   validTo: el.validTo,
      //   isActive: el.isActive,
      // })) ?? [],
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      namePublic: form.namePublic,

      requisiteMode: form.requisiteMode ?? defaultValues.requisiteMode,
      weeklyLimit: form.requisiteMode === defaultValues.requisiteMode ? null : form.weeklyLimit,
      
      paymentTypes: form.paymentTypeIds || [],
      products: form.productIds || [],
    };
  },
};