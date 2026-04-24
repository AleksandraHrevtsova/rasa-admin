import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/domain/role/role.service';

import { pageTags } from '@/config/constants';

export const useRoles = () => {
  return useQuery({
    queryKey: [pageTags.roles],
    queryFn: getRoles,
    select: (res) => res.data.items,
    staleTime: 1000 * 60 * 5,
  });
};