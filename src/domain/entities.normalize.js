import { pageTags } from '@/config/constants';
import { normalizeUser } from '@/domain/user/user.compare';
import { normalizeProduct } from '@/domain/product/product.compare';
import { normalizeCounterparty } from '@/domain/counterparty/counterparty.compare';

export const normalize = (entity, ctx) => {
  if (entity === pageTags.user) return normalizeUser(ctx);
  if (entity === pageTags.product) return normalizeProduct(ctx);
  if (entity === pageTags.counterparty) return normalizeCounterparty(ctx);
  return;
};
