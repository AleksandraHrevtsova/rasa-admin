import { useQuery } from '@tanstack/react-query';
import { getOrderStatuses } from '@/domain/order-status/order-status.service';

import { pageTags } from '@/config/constants';

export const useOrderStatuses = () => {
  return useQuery({
    queryKey: [pageTags.orderStatuses],
    queryFn: getOrderStatuses,
    select: (res) => res.data.data,
    staleTime: 1000 * 60 * 5,
  });
};