import { pageTags } from '@/config/constants';
import { useUserFormDerived } from '@/domain/user/hooks/useUserFormDerived';
import { useProductFormDerived } from '@/domain/product/hooks/useProductFormDerived';
import { useCounterpartyFormDerived } from '@/domain/counterparty/hooks/useCounterpartyFormDerived';

export const getEntityDerived = (entity, ctx) => {
  if (entity === pageTags.user) return useUserFormDerived(ctx);
  if (entity === pageTags.product) return useProductFormDerived(ctx);
  if (entity === pageTags.counterparty) return useCounterpartyFormDerived(ctx);
  return;
};
