import { formItemTypes } from "@/config/constants";

const validationPatterns = {
  phone: /^[\d+()\-\s]{7,20}$/,
  email: /^\S+@\S+\.\S+$/,
};

export function useEntityFormConfig({ t, k, fieldNames, isEdit, showClientFields, isActive }) {
  return {
    user: {
      fields: [
        { 
          type: formItemTypes.select, 
          name: fieldNames.role, 
          label: t(k.common.role), 
          placeholder: t(k.user.selectRole), 
          isMulti: false,
          required: true, 
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.select, 
          name: fieldNames.counterparty, 
          label: t(k.common.counterparty), 
          placeholder: t(k.user.selectCounterparty), 
          isMulti: false,
          required: showClientFields,
          isShowField: showClientFields, 
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.select, 
          name: fieldNames.hubs, 
          label: t(k.common.hubs), 
          placeholder: t(k.user.selectHubs), 
          isMulti: false,
          isMulti: true, 
          required: showClientFields,
          isShowField: showClientFields, 
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.text, 
          name: fieldNames.name,  
          label: t(k.common.name), 
          placeholder: t(k.user.enterName), 
          required: true,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.tel, 
          name: fieldNames.phone,  
          label: t(k.common.phone), 
          placeholder: t(k.user.enterPhone), 
          required: true,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.email, 
          name: fieldNames.email,  
          label: t(k.common.email), 
          placeholder: t(k.user.enterEmail), 
          required: true, 
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.password, 
          name: fieldNames.password, 
          label: t(k.common.password), 
          placeholder: t(k.user.enterPassword), 
          required: !isEdit,
          isShowField: true,
          isDisabled: !isActive,
        }
      ],
      rules: {
        roleId: { 
          required: true,
          validate: (v) => (showClientFields && !v) ? t(k.user.roleRequired) : true,
        },
        counterpartyId: { 
          required: showClientFields,
          validate: (v) => (showClientFields && !v) ? t(k.user.counterpartyRequired) : true,
        },
        hubIds: { 
          required: showClientFields,
          validate: (v) => (showClientFields && (!v || v.length === 0)) ? t(k.user.hubsRequired) : true 
        },
        name: { 
          required: t(k.user.nameRequired) 
        },
        phone: {
          required: t(k.user.phoneRequired),
          pattern: { value: validationPatterns.phone, message: t(k.user.incorrectPhone) }
        },
        email: {
          required: t(k.user.emailRequired),
          pattern: { value: validationPatterns.email, message: t(k.user.incorrectEmail) }
        },
        password: { 
          required: !isEdit ? t(k.common.passwordRequired) : false, 
          minLength: { value: 6, message: t(k.user.passwordMinLength) } 
        },
      },
    },
  };
}