import { useToggleActive } from '@/ui/hooks/useToggleActive';
import { toggleProductActive } from '@/domain/product/product.mutations';

export function useToggleProductActive(queryKey) {
  return useToggleActive({
    queryKey,
    mutationFn: toggleProductActive,
    getErrorMessage: (err) =>
      err?.response?.data?.message || 'Error updating product status',
  });
}