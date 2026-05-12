import { formItemTypes, compositeTypes } from '@/config/constants';

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
    pagetitle: isEdit ? t(k.product.editCurrent) : t(k.product.createNew),
    permissions: {
      canActivate,
      canDeactivate,
    },
    fields: [
      {
        type: compositeTypes.group,
        label: '',
        children: [
          {
            type: compositeTypes.grid,
            columns: 2,
            children: [
              { 
                span: 2,
                type: formItemTypes.input.text, 
                name: fieldNames.name,  
                label: t(k.common.nameBase), 
                placeholder: t(k.common.enterNameBase), 
                required: true,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                span: 1,
                type: formItemTypes.input.text, 
                name: fieldNames.namePublic,  
                label: t(k.common.namePublic), 
                placeholder: t(k.common.enterNamePublic), 
                required: true,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                span: 1,
                type: formItemTypes.input.text, 
                name: fieldNames.sku,  
                label: t(k.product.sku), 
                placeholder: t(k.product.enterSku), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
            ]
          }
        ]
      },
    
      {
        type: compositeTypes.group,
        label: t(k.product.weight),
        children: [
          {
            type: compositeTypes.row,
            children: [
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 0,
                  max: 1000,
                  step: 0.01
                },
                name: fieldNames.netto,  
                label: t(k.product.netto), 
                placeholder: t(k.product.enterSku), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 0,
                  max: 1000,
                  step: 0.01
                },
                name: fieldNames.brutto,  
                label: t(k.product.brutto), 
                placeholder: t(k.product.enterSku), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
            ]
          }
        ]
      },
    
      {
        type: compositeTypes.group,
        label: t(k.product.countIn), 
        children: [
          {
            type: compositeTypes.grid,
            columns: 3,
            children: [
              { 
                span: 3,
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 1,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.unitsInOneBox,  
                label: t(k.product.unitsInOneBox), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                span: 3,
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 1,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.unitsInOnePalletRegular,  
                label: t(k.product.unitsInOnePalletRegular), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                span: 3,
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 1,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.unitsInOnePalletMin,  
                label: t(k.product.unitsInOnePalletMin), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
            ]
          },
        ]
      },

      {
        type: compositeTypes.group,
        label: t(k.product.countBoxIn), 
        children: [
          {
            type: compositeTypes.row,
            children: [
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 1,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.boxesInOnePalletRegular,  
                label: t(k.product.boxesInOnePalletRegular), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 1,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.boxesInOnePalletMin,  
                label: t(k.product.boxesInOnePalletMin), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
            ]
          },
        ]
      },

      {
        type: compositeTypes.group,
        label: t(k.product.countOverOnePallet), 
        children: [
          {
            type: compositeTypes.row,
            children: [
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 0,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.unitsOverOnePallet,  
                label: t(k.product.unitsOverOnePallet), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
              { 
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 0,
                  max: 1000,
                  step: 1
                },
                name: fieldNames.boxesOverOnePallet,  
                label: t(k.product.boxesOverOnePallet), 
                placeholder: t(k.common.enterCount), 
                required: false,
                isShowField: true,
                isDisabled: !isActive,
              },
            ]
          }
        ]
      },
    ],

    rules: {},
  };
};