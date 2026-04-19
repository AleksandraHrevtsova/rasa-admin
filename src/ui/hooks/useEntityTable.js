import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../hooks/useDebounce';

const initialFilters = {
  search: '',
  isActive: true,
};

const SORTING = {
  desc: 'DESC',
  asc: 'ASC',
};

export function useEntityTable(fetchFn, options = {}) {
  const {
    defaultPageSize = 10,
  } = options;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  const [filters, setFilters] = useState(initialFilters);
  const debouncedFilters = useDebounce(filters, 400);

  const [sorting, setSorting] = useState([]);

  const queryKey = [
    'entities',
    {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      filters: debouncedFilters,
      sorting
    },
  ];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const params = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
        search: debouncedFilters.search,
        isActive: debouncedFilters.isActive,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? SORTING.desc : SORTING.asc,
      };
      const { data } = await fetchFn(params);
      return data;
    },
    keepPreviousData: true,
  });

  return {
    data: query.data?.items || [],
    total: query.data?.total || 0,
    loading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
    pagination,
    setPagination,
    filters,
    setFilters,
    sorting,
    setSorting,
  };
}