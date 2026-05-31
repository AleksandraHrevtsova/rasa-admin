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
        type: formItemTypes.input.text, 
        name: fieldNames.name,  
        label: t(k.common.nameBase), 
        placeholder: t(k.common.enterNameBase), 
        required: true,
        isShowField: true,
        isDisabled: !isActive && isEdit,
      },
      { 
        type: formItemTypes.input.text, 
        name: fieldNames.namePublic,  
        label: t(k.common.namePublic), 
        placeholder: t(k.common.enterNamePublic), 
        required: true,
        isShowField: true,
        isDisabled: !isActive && isEdit,
      },
      {
        type: compositeTypes.group,
        label: t(k.counterparty.requisiteSettings),
        children: [
          {
            type: compositeTypes.grid,
            columns: 2,
            children: [
              {
                span: 1,
                type: formItemTypes.select, 
                name: fieldNames.requisiteMode,  
                label: t(k.counterparty.requisiteMode), 
                placeholder: t(k.counterparty.selectRequisiteMode), 
                required: true, 
                isShowField: true,
                isDisabled: false,
              },
              {
                span: 1,
                type: formItemTypes.input.number, 
                inputParams: {
                  min: 100000,
                  max: 3000000,
                  step: 50000
                },
                name: fieldNames.weeklyLimit, 
                label: t(k.counterparty.weeklyLimit), 
                placeholder: t(k.counterparty.enterWeeklyLimit), 
                required: !isTargetModeOnly,
                isShowField: !isTargetModeOnly,
              },
            ],
          }
        ],
      },
      {
        type: compositeTypes.group,
        label: '',
        children: [
          {
            type: compositeTypes.grid,
            columns: 2,
            children: [
              {
                span: 1,
                type: compositeTypes.manager,
                component: compositeBlocks.paymentTypes,
                label: t(k.counterparty.availablePaymentTypes),
                name: fieldNames.paymentTypes,
                required: !isEdit,
                isEdit,
                options: options.paymentTypes,
              },
              {
                span: 1,
                type: compositeTypes.manager,
                component: compositeBlocks.products,
                label: t(k.counterparty.availableProducts),
                name: fieldNames.products,
                required: !isEdit,
                isEdit,
                options: options.products,
              },
            ]
          }
        ],
      },
      {
        type: compositeTypes.manager,
        component: compositeBlocks.employees,
        label: t(k.counterparty.employees),
        name: fieldNames.employees,
        isShowField: isEdit,
        children: []
      },
      {
        type: compositeTypes.manager,
        component: compositeBlocks.hubs,
        label: t(k.common.hubs),
        name: fieldNames.hubs,
        isShowField: isEdit,
        children: []
      },

    ],
    rules: {},
  }
};