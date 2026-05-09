import { formItemTypes } from "@/config/constants";

export const formConfig = ({
  t, 
  k, 
  fieldNames, 
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
        type: formItemTypes.input.text, 
        name: fieldNames.name,  
        label: t(k.common.nameBase), 
        placeholder: t(k.common.enterNameBase), 
        required: true,
        isShowField: true,
        isDisabled: !isActive,
      },
      { 
        type: formItemTypes.input.text, 
        name: fieldNames.namePublic,  
        label: t(k.common.namePublic), 
        placeholder: t(k.common.enterNamePublic), 
        required: true,
        isShowField: true,
        isDisabled: !isActive,
      },
    ],
    rules: {},
  }
};