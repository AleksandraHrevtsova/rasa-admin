export function useEntityFormConfig({ t, isEdit, showClientFields, isActive }) {
  return {
    user: {
      fields: [
        { 
          type: 'select', 
          name: 'roleId', 
          label: t['user.role'], 
          placeholder: t['user.selectRole'], 
          isMulti: false,
          required: true, 
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: 'select', 
          name: 'counterpartyId', 
          label: t['user.counterparty'], 
          placeholder: t['user.selectCounterparty'], 
          isMulti: false,
          required: showClientFields,
          isShowField: showClientFields, 
          isDisabled: !isActive,
        },
        { 
          type: 'select', 
          name: 'hubIds', 
          label: t['user.hub'], 
          placeholder: t['user.selectHubs'], 
          isMulti: false,
          isMulti: true, 
          required: showClientFields,
          isShowField: showClientFields, 
          isDisabled: !isActive,
        },
        { 
          type: 'text', 
          name: 'name',  
          label: t['user.name'], 
          placeholder: t['user.enterName'], 
          required: true,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: 'tel', 
          name: 'phone',  
          label: t['user.phone'], 
          placeholder: t['user.enterPhone'], 
          required: true,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: 'email', 
          name: 'email',  
          label: t['user.email'], 
          placeholder: t['user.enterEmail'], 
          required: true, 
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: 'password', 
          name: 'password', 
          label: t['user.password'], 
          placeholder: t['user.enterPassword'], 
          required: !isEdit,
          isShowField: true,
          isDisabled: !isActive,
        }
      ],
      rules: {
        roleId: { 
          required: true,
          validate: (v) => (showClientFields && !v) ? t['requiredValue'] : true,
        },
        counterpartyId: { 
          required: showClientFields,
          validate: (v) => (showClientFields && !v) ? t['requiredValue'] : true,
        },
        hubIds: { 
          required: showClientFields,
          validate: (v) => (showClientFields && (!v || v.length === 0)) ? t['requiredValue'] : true 
        },
        name: { 
          required: t['rules.name'] 
        },
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