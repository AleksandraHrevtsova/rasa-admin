import { pageTags } from '@/config/constants';
import { useUserFormDerived } from '@/domain/user/hooks/useUserFormDerived';
import { useProductFormDerived } from '@/domain/product/hooks/useProductFormDerived';
import { useCounterpartyFormDerived } from '@/domain/counterparty/hooks/useCounterpartyFormDerived';

export const getEntityDerived = (entity) => {
  if (entity === pageTags.user) return useUserFormDerived;
  if (entity === pageTags.product) return useProductFormDerived;
  if (entity === pageTags.counterparty) return useCounterpartyFormDerived;
  return;
};
