export function useEntityFormConfig({ t, isEdit, showClientFields }) {
  return {
    user: {
      fields: {
        role: { name: 'role', type: 'select', placeholder: t['user.role'] },
        counterparty: { name: 'counterparty', type: 'select', placeholder: t['user.counterparty'], required: showClientFields },
        hubs: { name: 'hubs', type: 'select', placeholder: t['user.hubs'], isMulti: true, required: showClientFields },
        name: { name: 'name', type: 'text', placeholder: t['user.name'], required: !isEdit },
        phone: { name: 'phone', type: 'tel', placeholder: t['user.phone'], required: !isEdit },
        email: { name: 'email', type: 'email', placeholder: t['user.email'], required: !isEdit },
        password: { name: 'password', type: 'password', placeholder: t['user.password'], required: !isEdit }
      },
      rules: {
        counterparty: { validate: (v) => (showClientFields && !v) ? t['rules.counterparty'] : true },
        hubs: { validate: (v) => (showClientFields && (!v || v.length === 0)) ? t['rules.hubs'] : true },
        name: { required: t['rules.name'] },
        phone: {
          required: t['rules.phone'],
          pattern: { value: /^[\d+()\-\s]{7,20}$/, message: t['rules.incorrectPhone'] }
        },
        email: {
          required: t['rules.email'],
          pattern: { value: /^\S+@\S+\.\S+$/, message: t['rules.incorrectEmail'] }
        },
        password: { 
          required: !isEdit ? t['rules.password'] : false, 
          minLength: { value: 6, message: t['rules.passwordMinLength'] } 
        },
      },
    },
  };
}