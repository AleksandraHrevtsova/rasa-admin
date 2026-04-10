import { useMemo, useState, useEffect} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';

import { useLocale } from '../contexts/LocaleContext';

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
    <div className="flex gap-2 mt-3 text-sm items-center">
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
  const { t } = useLocale();

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
    return (<div className="p-4 text-gray-500">{t['table.noData']}</div>);
  }

  return (
    <div className="w-full overflow-x-auto flex flex-col items-center">
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 text-left cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data?.length > 10 && (
        <Pagination 
          pageCount={pageCount}
          pagination={effectivePagination}
          setPagination={setPagination}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}