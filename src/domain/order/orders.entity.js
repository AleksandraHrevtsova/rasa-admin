import { getOrders } from '@/domain/order/order.service';
import { getOrderColumns } from '@/domain/order/orders.table';

export const ordersEntity = (ctx) => ({
  key: ctx.pageTags.orders,
  title: ctx.k.orders.title, 

  fetchFn: getOrders,
  columns: getOrderColumns,

  paths: {
    list: ctx.nav.orders,
    create: ctx.nav.newOrder,
    edit: ctx.nav.editOrder,
  },
});