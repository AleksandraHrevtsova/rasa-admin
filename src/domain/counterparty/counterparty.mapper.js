export const counterpartyMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      namePublic: data.namePublic,
      hubIds: data.hubs?.map(({ el }) => el?.id) || [],
      paymentTypeIds: data.paymentTypes?.map(({ el }) => el.id) || [],
      productIds: data.products?.map(({ el }) => el.id) || [],
      organizationIds: data.organizations?.map(({ el }) => el.id) || [],
      employeeIds: data.employees?.map(({ el }) => el.id) || [],
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      namePublic: form.namePublic,
      hubs: form.hubIds || [],
      paymentTypes: form.paymentTypes || [],
      products: form.productIds || [],
      organizations: form.organizationIds || [],
      employees: form.eemployeeIds || [],
    };
  },
};