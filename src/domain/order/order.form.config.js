import { formItemTypes, compositeTypes, compositeBlocks } from '@/config/constants';

export const formConfig = ({
  t, 
  k, 
  fieldNames, 
  isTargetModeOnly,
  options,
  isEdit, 
  isActive,
}) => {
  const canDeactivate = isEdit && isActive;
  const canActivate = isEdit && !isActive;

  return {
    pagetitle: isEdit ? t(k.counterparty.editCurrent) : t(k.counterparty.createNew),
    permissions: {
      canActivate,
      canDeactivate,
    },
    fields: [
      { 
        type: formItemTypes.select, 
        name: fieldNames.status, 
        label: t(k.order.status), 
        placeholder: t(k.user.selectStatus), 
        isMulti: false,
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
        required: true,
        isShowField: true, 
        isDisabled: false,
      },
      { 
        type: formItemTypes.select, 
        name: fieldNames.hub, 
        label: t(k.common.hub), 
        placeholder: t(k.user.selectHub), 
        isMulti: false,
        required: true,
        isShowField: true, 
        isDisabled: false,
      },
    ],
    rules: {}
  }
};