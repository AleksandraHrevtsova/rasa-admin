import { useToggleActive } from '@/ui/hooks/useToggleActive';
import { toggleUserActive } from '@/domain/user/user.mutations';

export function useToggleUserActive(queryKey) {
  return useToggleActive({
    queryKey,
    mutationFn: toggleUserActive,
    getErrorMessage: (err) =>
      err?.response?.data?.message || 'Error updating user status',
  });
};