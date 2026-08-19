import { createRegistryContext } from '@/core/registry/registry.context';
const ctx = createRegistryContext();

import { user } from '@/domain/user';
import { product } from '@/domain/product';
import { counterparty } from '@/domain/counterparty';
import { organization } from '@/domain/organization';
import { order } from '@/domain/order';

export const forms = {
  user: user(ctx),
  product: product(ctx),
  counterparty: counterparty(ctx),
  organization: organization(ctx),
  order: order(ctx),
};