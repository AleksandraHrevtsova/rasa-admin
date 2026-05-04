export const counterpartyMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      namePublic: data.namePublic,
      hubIds: data.hubs?.map(({ el }) => el.id) || [],
      productIds: data.products?.map(({ el }) => el.id) || [],
      employeeIds: data.employees?.map(({ el }) => el.id) || [],
      organizationIds: data.organizations?.map(({ el }) => el.id) || [],
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      namePublic: form.namePublic,
      hubIds: form.hubIds || [],
      productIds: form.productIds || [],
      employeeIds: form.eemployeeIds || [],
      organizationIds: form.organizationIds || [],
    };
  },
};