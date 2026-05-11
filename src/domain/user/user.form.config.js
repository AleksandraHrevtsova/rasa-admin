import { formItemTypes } from '@/config/constants';

const validationPatterns = {
  phone: /^[\d+()\-\s]{7,20}$/,
  email: /^\S+@\S+\.\S+$/,
};

export const formConfig = ({
  t, 
  k, 
  fieldNames, 
  showClientFields = null, 
  isEdit, 
  isActive, 
  isCurrentUser,
}) => {
  const canDeactivateUser = isEdit && isActive && !isCurrentUser;
  const canDeactivate = isEdit && isActive;
  const canActivate = isEdit && !isActive;
  return {
    pagetitle: isEdit ? t(k.user.editCurrent) : t(k.user.createNew),
    permissions: {
      canActivate,
      canDeactivate: canDeactivateUser,
    },
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
        required: t(k.user.roleRequired),
      },
      counterpartyId: { 
        validate: (v) => {
          if (!showClientFields) return true;
          return v ? true : t(k.user.counterpartyRequired);
        },
      },
      hubIds: { 
        validate: (v) => {
          if (!showClientFields) return true;
          return (Array.isArray(v) && v.length > 0)
            ? true
            : t(k.user.hubsRequired);
        },
      },
      name: { 
        required: t(k.user.nameRequired) 
      },
      phone: {
        required: t(k.user.phoneRequired),
        pattern: { 
          value: validationPatterns.phone, 
          message: t(k.user.incorrectPhone) 
        },
      },
      email: {
        required: t(k.user.emailRequired),
        pattern: { 
          value: validationPatterns.email, 
          message: t(k.user.incorrectEmail) 
        },
      },
      password: { 
        required: !isEdit ? t(k.common.passwordRequired) : false, 
        minLength: { 
          value: 6, 
          message: t(k.user.passwordMinLength) 
        }, 
      },
    },
  };
};