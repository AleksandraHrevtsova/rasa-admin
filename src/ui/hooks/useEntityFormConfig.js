import { formItemTypes } from "@/config/constants";

const validationPatterns = {
  phone: /^[\d+()\-\s]{7,20}$/,
  email: /^\S+@\S+\.\S+$/,
};

export function useEntityFormConfig({ t, k, fieldNames, showClientFields = null, isEdit, isActive, isCurrentUser }) {
  const canDeactivateUser = isEdit && isActive && !isCurrentUser;
  const canDeactivate = isEdit && isActive;
  const canActivate = isEdit && !isActive;
  return {
    
    user: {
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
    product: {
      pagetitle: isEdit ? t(k.product.editCurrent) : t(k.product.createNew),
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
        { 
          type: formItemTypes.input.text, 
          name: fieldNames.sku,  
          label: t(k.product.sku), 
          placeholder: t(k.product.enterSku), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.netto,  
          label: t(k.product.netto), 
          placeholder: t(k.product.enterSku), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.brutto,  
          label: t(k.product.brutto), 
          placeholder: t(k.product.enterSku), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.unitsInOneBox,  
          label: t(k.product.unitsInOneBox), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.unitsInOnePalletRegular,  
          label: t(k.product.unitsInOnePalletRegular), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.unitsInOnePalletMin,  
          label: t(k.product.unitsInOnePalletMin), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.boxesInOnePalletRegular,  
          label: t(k.product.boxesInOnePalletRegular), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.boxesInOnePalletMin,  
          label: t(k.product.boxesInOnePalletMin), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.unitsOverOnePallet,  
          label: t(k.product.unitsOverOnePallet), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
        { 
          type: formItemTypes.input.number, 
          name: fieldNames.boxesOverOnePallet,  
          label: t(k.product.boxesOverOnePallet), 
          placeholder: t(k.common.enterCount), 
          required: false,
          isShowField: true,
          isDisabled: !isActive,
        },
      ],
      rules: {},
    },
    counterparty: {
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
    },
  };
}