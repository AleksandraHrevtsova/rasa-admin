export const userMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      roleId: data.role?.id || null,
      counterpartyId: data.counterparty?.id || null,
      hubIds: data.hubs?.map(({ el }) => el.id) || [],
    };
  },

  toApi: (form) => {
    return {
      name: form.name,
      email: form.email,
      phone: form.phone,
      roleId: form.roleId,
      counterpartyId: form.counterpartyId || null,
      hubIds: form.hubIds || [],
      password: form.password,
    };
  },
};

// export const mapUserFromApi = (obj) => {
//   return {
//     name: obj.name,
//     email: obj.email,
//     phone: obj.phone,
//     roleId: obj.role?.id || null,
//     counterpartyId: obj.counterparty?.id || null,
//     hubIds: obj.hubs?.map(({ el }) => el.id) || [],
//   }
// };

// export const mapUserToApi = (obj) => {
//   return {
//     name: obj.name,
//     email: obj.email,
//     phone: obj.phone,
//     roleId: obj.roleId,
//     counterpartyId: obj.counterpartyId || null,
//     hubIds: obj.hubIds || [],
//     password: obj.password,
//   }
// };