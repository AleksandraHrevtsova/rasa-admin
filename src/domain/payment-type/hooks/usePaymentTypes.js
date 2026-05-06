import { useQuery } from '@tanstack/react-query';
import { getPaymentTypes } from '@/domain/payment-type/payment-type.service';

import { pageTags } from '@/config/constants';

export const usePaymentTypes = () => {
  return useQuery({
    queryKey: [pageTags.paymentTypes],
    queryFn: getPaymentTypes,
    select: (res) => res.data.data,
    staleTime: 1000 * 60 * 5,
  });
};