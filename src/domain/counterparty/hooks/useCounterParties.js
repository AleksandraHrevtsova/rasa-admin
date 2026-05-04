import { useQuery } from '@tanstack/react-query';
import { getCounterparties } from '@/domain/counterparty/counterparty.service';

import { pageTags } from '@/config/constants';

export const useCounterparties = () => {
  return useQuery({
    queryKey: [pageTags.counterparties],
    queryFn: getCounterparties,
    select: (res) => res.data.data,
    staleTime: 1000 * 60 * 5,
  });
};