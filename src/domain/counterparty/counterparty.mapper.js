export const mapCounterpartyFromApi = (obj) => {
  return {
    name: obj.name,
    namePublic: obj.namePublic,
    hubIds: obj.hubs?.map(({ el }) => el.id) || [],
    productIds: obj.products?.map(({ el }) => el.id) || [],
    employeeIds: obj.employees?.map(({ el }) => el.id) || [],
    organizationIds: obj.organizations?.map(({ el }) => el.id) || [],
  }
};

export const mapCounterpartyToApi = (obj) => {
  return {
    name: obj.name,
    namePublic: obj.namePublic,
    hubIds: obj.hubIds || [],
    productIds: obj.productIds || [],
    employeeIds: obj.eemployeeIds || [],
    organizationIds: obj.organizationIds || [],
  }
};