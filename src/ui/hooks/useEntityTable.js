import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const SORTING = {
  desc: 'DESC',
  asc: 'ASC',
};

export function useEntityTable(fetchFn, options = {}) {
  const {
    defaultPageSize = 10,
    withActiveToggle = false,
  } = options;

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [filters, setFilters] = useState({
    search: ''
  });
  const [sorting, setSorting] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const queryKey = [
    'entities',
    {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      filters,
      sorting,
      isActive,
    },
  ];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const params = {
        page: pagination.pageIndex,
        size: pagination.pageSize,
        search: filters.search,
        isActive,
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
    ...(withActiveToggle && {
      isActive,
      setIsActive,
    }),
  };
}