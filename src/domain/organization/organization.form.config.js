import { formItemTypes } from '@/config/constants';

export const formConfig = ({
  t, 
  k, 
  fieldNames, 
  isLogistics,
  isPaymentOrg,
  isEdit, 
  isActive, 
}) => {
  const canDeactivate = isEdit && isActive;
  const canActivate = isEdit && !isActive;

  return {
    pagetitle: isEdit ? t(k.organization.editCurrent) : t(k.organization.createNew),
    permissions: {
      canActivate,
      canDeactivate,
    },
    fields: [
      { 
        type: formItemTypes.input.text, 
        name: fieldNames.name,  
        label: t(k.common.title), 
        placeholder: t(k.common.enterNameBase), 
        required: true,
        isShowField: true,
        isDisabled: false,
      },
      { 
        type: formItemTypes.input.text, 
        name: fieldNames.code,  
        label: t(k.organization.code), 
        placeholder: t(k.organization.enterCode), 
        required: true,
        isShowField: true,
        isDisabled: false,
      },
      { 
        type: formItemTypes.input.date, 
        name: fieldNames.validFrom,  
        label: t(k.organization.validFrom), 
        placeholder: t(k.common.enterDate), 
        required: true, 
        isShowField: true,
        isDisabled: false,
      },
      { 
        type: formItemTypes.input.date, 
        name: fieldNames.validTo, 
        label: t(k.organization.validTo), 
        placeholder: t(k.common.enterDate), 
        required: false,
        isShowField: true,
        isDisabled: false,
      },
      {
        type: formItemTypes.select,
        name: fieldNames.type,
        label: t(k.organization.type),
        placeholder: t(k.organization.selectType),
        required: true,
        isShowField: true,
        isDisabled: false,
      },
      { 
        type: formItemTypes.select, 
        name: fieldNames.counterparty, 
        label: t(k.common.counterparty), 
        placeholder: t(k.user.selectCounterparty), 
        isMulti: false,
        required: isLogistics,
        isShowField: isLogistics, 
        isDisabled: !isActive && !isLogistics,
      },
      { 
        type: formItemTypes.select, 
        name: fieldNames.hubs, 
        label: t(k.common.hubs), 
        placeholder: t(k.user.selectHubs), 
        isMulti: false,
        isMulti: true, 
        required: isLogistics,
        isShowField: isLogistics, 
        isDisabled: !isActive && !isLogistics,
      },
    ],
    rules: {
      counterpartyId: { 
        validate: (v) => {
          if (isPaymentOrg) return true;
          return v ? true : t(k.user.counterpartyRequired);
        },
      },
      hubIds: { 
        validate: (v) => {
          if (isPaymentOrg) return true;
          return (Array.isArray(v) && v.length > 0)
            ? true
            : t(k.user.hubsRequired);
        },
      },
      name: { 
        required: t(k.user.nameRequired) 
      },
      code: {
        required: t(k.user.phoneRequired),
      },
      validFrom: {
        required: t(k.user.emailRequired),
      },
    },
  }
};