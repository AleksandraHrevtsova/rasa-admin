import { useEffect, useState, useCallback } from 'react';
import { useNotify } from './useNotify';

export function useEntityTable(fetchFn, options = {}) {
  const notify = useNotify();

  const {
    defaultPageSize = 20,
    withActiveToggle = true,
  } = options;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState(true);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
    total: 0,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const params = {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };

      if (withActiveToggle) {
        params.isActive = isActive;
      }

      const { data } = await fetchFn(params);

      setData(data.items || []);

      setPagination((prev) => ({
        ...prev,
        total: data.total,
        pageIndex: data.page - 1,
      }));

    } catch (err) {
      const message = err.response?.data?.message || 'Error';
      notify.error(message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, pagination.pageIndex, pagination.pageSize, isActive]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    pagination,
    setPagination,
    refetch: fetchData,

    ...(withActiveToggle && {
      isActive,
      setIsActive,
    }),
  };
}