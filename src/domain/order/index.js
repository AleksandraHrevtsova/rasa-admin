import { createEntity } from '@/core/registry/createEntity';
import { ordersEntity } from '@/domain/order/orders.entity';
import { orderForm } from '@/domain/order/order.form.js';

export const orders = createEntity(ordersEntity);
export const order = createEntity(orderForm);
