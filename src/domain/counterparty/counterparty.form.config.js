import { formItemTypes, compositeTypes, compositeBlocks } from '@/config/constants';

export const formConfig = ({
  t, 
  k, 
  fieldNames, 
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
        type: compositeTypes.manager,
        component: compositeBlocks.paymentTypes,
        label: t(k.counterparty.availablePaymentTypes),
        name: fieldNames.paymentTypes,
        isEdit,
        options: options.paymentTypes,
      },
      {
        type: compositeTypes.manager,
        component: compositeBlocks.products,
        label: t(k.counterparty.availableProducts),
        name: fieldNames.products,
        isEdit,
        options: options.products,
      },
      {
        type: compositeTypes.group,
        label: t(k.counterparty.availableOrganizations),
        children: [
          // 2 столбца (с подзаголовками: группа 1 и группа 2)
          // в 1 столбце (группа 1) у заголовка кнопка добавить (+)
          // список доступных организаций в столбик с кнопкой (-) удалить(деактивировать) в каждой организации
          // в 2 столбце (группа 2) без кнопки (+)
          // список орагнизаций, сформированный в виде имя контрагента counterparty.nameBase + hub.nameBase
          // то есть организаций в группе 2 будет столько, суолько складов (хабов) у контрагента
        ]
      },
      {
        type: compositeTypes.group,
        label: t(k.counterparty.employees),
        children: [
          // у залоговка кнопка добавить/пригласить (+) 
          // отображать таблицу пользователей в виде
          // имя, склад и кнопка (-) удалить(деактивировать)
        ]
      },
    ],
    rules: {},
  }
};