import {
  getOrderById,
  createOrder,
  updateOrder,
  activateOrder,
  deactivateOrder,
} from '@/domain/order/order.service';

import { fields } from '@/domain/order/order.fields';

import { useCounterparties } from '@/domain/counterparty/hooks/useCounterparties';
import { useOrderStatuses } from '@/domain/order-status/hooks/useOrderStatuses';

import { orderMapper } from '@/domain/order/order.mapper';
import { normalizeOrder } from '@/domain/order/order.compare';

import { useOrderFormDerived } from '@/domain/order/hooks/useOrderFormDerived';
import { formConfig } from '@/domain/order/order.form.config';

export const orderForm = (ctx) => {
  return {
    key: ctx.pageTags.order,

    paths: {
      list: ctx.nav.orders,
      create: ctx.nav.newOrder,
      edit: ctx.nav.editOrder,
    },

    api: {
      getById: getOrderById,
      create: createOrder,
      update: updateOrder,
      activate: activateOrder,
      deactivate: deactivateOrder,
    },

    fieldNames: fields,

    hooks: {
      useData: () => {
        const { data: counterparties = [] } = useCounterparties();
        const { data: orderStatuses = [] } = useOrderStatuses();
        // console.log('counterparties:', counterparties);
        return { counterparties, orderStatuses };
      },
    },

    mapper: {
      fromApi: orderMapper.fromApi,
      toApi: orderMapper.toApi,
      normalize: normalizeOrder,
    },

    useDerived: useOrderFormDerived,
    config: formConfig,
  }
};