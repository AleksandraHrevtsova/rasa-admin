import { useEffect, useState, useRef, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown,
} from 'lucide-react';

import { styleTokens } from '@/ui/tokens/form.tokens';
import { Pagination } from '@/ui/components/table/Pagination';
import { Loading } from '@/ui/components/Loading';
import { DataTableSkeleton } from '@/ui/components/DataTableSkeleton';

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

  if (loading && data.length === 0) {
    return (
      <div className='hidden md:block overflow-x-auto'>
        <table className={styleTokens.table.desktop}>
          <thead className='bg-gray-50'>
            <tr>
              {columns.map((col, ci) => (
                <th key={col.key || ci} className={styleTokens.table.label}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <DataTableSkeleton columns={columns} />
        </table>
      </div>
    );
  }

  return (
    <div className='w-full'>
      {/* WRAPPER ДЛЯ OVERLAY */}
      <div className={`relative transition-opacity duration-200 ${
        isFetching ? 'opacity-60' : 'opacity-100'
      }`}>
        {/* DESKTOP */}
        <div className='hidden md:block overflow-x-auto'>
          <table className={styleTokens.table.desktop}>

            <thead className='bg-gray-50 sticky top-0 z-10'>
              {table.getHeaderGroups().map((hg, ci) => (
                <tr key={hg.id || ci}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`
                        p-3 text-sm text-gray-600 text-left font-semibold select-none
                        ${header.column.getCanSort() ? 'cursor-pointer' : ''}
                      `}
                      style={{ width: header.column.columnDef.size }}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className='flex items-center gap-1'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {{
                              asc: <ArrowUp size={14} className='text-gray-500' />,
                              desc: <ArrowDown size={14} className='text-gray-500' />,
                            }[header.column.getIsSorted()] ?? (
                              <ArrowUpDown size={14} className='text-gray-400' />
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`
                    border-b cursor-pointer transition-colors duration-700
                    hover:bg-gray-50
                    ${highlightedRows.has(row.original.id) ? 'bg-yellow-50 animate-pulse' : ''}
                  `}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className='p-3 text-sm text-gray-800'
                      style={{ width: cell.column.columnDef.size }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className='md:hidden flex flex-col gap-3'>
          {table.getRowModel().rows.map((row) => {
            const item = row.original;
            return (
              <div
                key={row.id}
                className='border rounded-xl p-3 shadow-sm bg-white hover:bg-gray-50 transition cursor-pointer'
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col, ci) => {
                  const value = col.render ? col.render(item) : item[col.key];
                  return (<MobileCard key={col.id || ci} col={col} value={value} />);
                })}
              </div>
            );
          })}
        </div>

        {/* SHIMMER) */}
        {isFetching && data.length > 0 && (<Shimmer />)}
      </div>

      {(effectivePagination.total > effectivePagination.pageSize) && (
        <div className='mt-4 flex justify-center md:justify-between'>
          <Pagination
            pageCount={pageCount}
            pagination={effectivePagination}
            setPagination={setPagination}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      )}
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className='absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-start justify-center pt-2 z-20'>
      <div className='w-full px-2'>
        <div className='h-1 w-full bg-blue-400/40 animate-pulse rounded' />
      </div>
    </div>
  );
};

const MobileCard = ({ col, value }) => {
  return (
    <div
      key={col.key}
      className='flex justify-between text-sm py-1 border-b last:border-b-0'
    >
      <span className='text-gray-500'>
        {col.label}
      </span>

      <span className='text-gray-900 font-medium text-right'>
        {value ?? '—'}
      </span>
    </div>
  );
};