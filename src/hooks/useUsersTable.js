import { useEffect, useState } from 'react';
import { getUsers } from '../services/user.service';
import { useNotify } from '../hooks/useNotify';

export function useUsersTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState(true);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
    total: 0,
  });

  const fetchUsers = async () => {
    setLoading(true);
    const notify = useNotify();

    try {
      const { data } = await getUsers({
        isActive,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });
      setData(data.users);
      setPagination((prev) => ({
        ...prev,
        total: data.total,
        pageIndex: data.page - 1,
      }));
    } catch (err) {
      const resData = err.response?.data;
      notify.error(resData.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isActive, pagination.pageIndex, pagination.pageSize]);

  return {
    data,
    loading,
    isActive,
    setIsActive,
    pagination,
    setPagination,
    refetch: fetchUsers,
  };
}