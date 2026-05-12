import { useQuery } from '@tanstack/react-query';
import { getOrganizations } from '@/domain/organization/organization.service';

import { pageTags } from '@/config/constants';

export const useOrganizations = () => {
  return useQuery({
    queryKey: [pageTags.organizations],
    queryFn: getOrganizations,
    select: (res) => res.data.data,
    staleTime: 1000 * 60 * 5,
  });
};