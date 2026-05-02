import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/domain/product/product.service';

import { pageTags } from '@/config/constants';

export const useProducts = () => {
  return useQuery({
    queryKey: [pageTags.products],
    queryFn: getProducts,
    select: (res) => res.data.items,
    staleTime: 1000 * 60 * 5,
  });
};