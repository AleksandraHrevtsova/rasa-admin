export const userMapper = {
  fromApi: (data) => {
    if (!data) return {};

    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      roleId: data.role?.id || null,
      counterpartyId: data.counterparty?.id || null,
      hubIds: data.hubs?.map((el) => el.id) || [],
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