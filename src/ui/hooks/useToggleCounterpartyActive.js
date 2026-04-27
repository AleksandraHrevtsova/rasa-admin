import { useToggleActive } from '@/ui/hooks/useToggleActive';
import { toggleCounterpartyActive } from '@/domain/counterparty/counterparty.mutations';

export function useToggleCounterpartyActive(queryKey) {
  return useToggleActive({
    queryKey,
    mutationFn: toggleCounterpartyActive,
    getErrorMessage: (err) =>
      err?.response?.data?.message || 'Error updating product status',
  });
};