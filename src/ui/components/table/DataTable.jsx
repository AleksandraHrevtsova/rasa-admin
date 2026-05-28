import { useEffect, useState, useRef, useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import { Loading } from '@/ui/components/Loading';
import { DataTableSkeleton } from '@/ui/components/table/DataTableSkeleton';
import { TableWrappers } from '@/ui/components/table/TableWrappers';
import { DesktopTable } from '@/ui/components/table/DesktopTable';
import { MobileTable } from '@/ui/components/table/MobileTable';
import { Shimmer } from '@/ui/components/table/Shimmer';

export default function DataTable({
  data = [],
  columns = [],
  loading,
  isFetching,
  pagination,
  setPagination,
  pageSizeOptions = [5, 10, 20, 50],
  sorting,
  setSorting,
  onRowClick,
}) {
  const prevDataRef = useRef([]);
  const [highlightedRows, setHighlightedRows] = useState(new Set());

  useEffect(() => {
    if (!data?.length || !prevDataRef.current.length) {
      prevDataRef.current = data;
      return;
    }
  
    const prev = prevDataRef.current;
    const next = data;
  
    const changed = new Set();
  
    next.forEach((row) => {
      const oldRow = prev.find((r) => r.id === row.id);
      if (!oldRow) return;
      if (JSON.stringify(oldRow) !== JSON.stringify(row)) {
        changed.add(row.id);
      }
    });
  
    if (changed.size) {
      setHighlightedRows(changed);
  
      setTimeout(() => {
        setHighlightedRows(new Set());
      }, 1500);
    }
  
    prevDataRef.current = data;
  }, [data]);

  const effectivePagination = pagination || {
    pageIndex: 0,
    pageSize: pageSizeOptions[0],
    total: 0,
  };

  const pageCount = useMemo(() => {
    const total = effectivePagination.total || 0;
    const size = effectivePagination.pageSize || 1;
    return Math.max(1, Math.ceil(total / size));
  }, [effectivePagination.total, effectivePagination.pageSize]);

  const tableColumns = useMemo(() => {
    return columns.map((col) => ({
      accessorKey: col.key,
      id: col.id || col.key,
      header: col.label,
      size: col.width,
      cell: (info) => {
        const row = info.row.original;

        if (col.render) return col.render(row);

        const value = info.getValue();
        if (value === null || value === undefined) return '—';

        return String(value);
      },
      enableSorting: col.sortable ?? false,
    }));
  }, [columns]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      pagination: {
        pageIndex: effectivePagination.pageIndex,
        pageSize: effectivePagination.pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true,
    pageCount,
    
    onSortingChange: (updater) => {
      setSorting(updater);
    
      setPagination((prev) => ({
        ...prev,
        pageIndex: 0,
      }));
    },
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
  });

  if (isFetching && data.length > 0) return <Loading />;
  if (loading && data.length === 0) return <DataTableSkeleton columns={columns} />;

  return (
    <TableWrappers
      isFetching={isFetching}
      effectivePagination={effectivePagination}
      pageCount={pageCount}
      setPagination={setPagination}
      pageSizeOptions={pageSizeOptions}
    >
      {/* DESKTOP */}
      <DesktopTable table={table} onRowClick={onRowClick} highlightedRows={highlightedRows}/>

      {/* MOBILE */}
      <MobileTable table={table} onRowClick={onRowClick} columns={columns}/>

      {isFetching && data.length > 0 && (<Shimmer />)}
    </TableWrappers>
  );
};
