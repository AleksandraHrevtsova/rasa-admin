import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

import { useI18n } from '@/ui/hooks/useI18n';

const Pagination = ({
  pageCount,
  pagination,
  setPagination,
  pageSizeOptions,
}) => {
  const pageIndex = pagination.pageIndex;

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  return (
    <div className='flex gap-2 mt-3 text-sm items-center'>
      <button
        onClick={() => setPagination(p => ({ ...p, pageIndex: 0 }))}
        disabled={!canPrev}
      >
        ⏮
      </button>

      <button
        onClick={() =>
          setPagination(p => ({
            ...p,
            pageIndex: Math.max(0, p.pageIndex - 1),
          }))
        }
        disabled={!canPrev}
      >
        ◀
      </button>

      <span>
        {pageIndex + 1} / {pageCount || 1}
      </span>

      <button
        onClick={() =>
          setPagination(p => ({
            ...p,
            pageIndex: Math.min(pageCount - 1, p.pageIndex + 1),
          }))
        }
        disabled={!canNext}
      >
        ▶
      </button>

      <button
        onClick={() =>
          setPagination(p => ({
            ...p,
            pageIndex: pageCount - 1,
          }))
        }
        disabled={!canNext}
      >
        ⏭
      </button>

      <select
        value={pagination.pageSize}
        onChange={(e) =>
          setPagination(p => ({
            ...p,
            pageSize: Number(e.target.value),
            pageIndex: 0,
          }))
        }
      >
        {pageSizeOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function DataTable({
  data = [],
  columns = [],
  onRowClick,
  pagination,
  setPagination,
  pageSizeOptions = [5, 10, 20, 50],
}) {
  const { t, k } = useI18n();

  const [sorting, setSorting] = useState([]);

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
    pageCount,
    
    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!data.length) {
    return (<div className='p-4 text-gray-500'>{t(k.table.noData)}</div>);
  }

  return (
    <div className='w-full'>
      <div className='hidden md:block overflow-x-auto'>
        <table className='min-w-full border border-gray-200 rounded-xl overflow-hidden'>
          <thead className='bg-gray-50 sticky top-0 z-10'>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className='p-3 text-left text-sm font-semibold text-gray-600 cursor-pointer select-none'
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className='flex items-center gap-1'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
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
                className='hover:bg-gray-50 transition cursor-pointer border-b'
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='p-3 text-sm text-gray-800'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='md:hidden flex flex-col gap-3'>
        {table.getRowModel().rows.map((row) => {
          const item = row.original;

          return (
            <div
              key={row.id}
              className='border rounded-xl p-3 shadow-sm bg-white hover:bg-gray-50 transition cursor-pointer'
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((col) => {
                const value = col.render
                  ? col.render(item)
                  : item[col.key];

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
              })}
            </div>
          );
        })}
      </div>

      {data?.length > 10 && (
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
}