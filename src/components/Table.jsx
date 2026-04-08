import { useMemo } from "react";
import { useLocale } from "../contexts/LocaleContext";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';

function formatHeader(key, t) {
  return t[`users.${key}`] || key;
};

function createColumns(t) {
  const included = ['name', 'phone', 'email', 'role', 'userHubs'];

  return included.map((key) => ({
    accessorKey: key,
    header: formatHeader(key, t),
    cell: (info) => {
      const value = info.getValue();
      if (key === 'role') return value?.name ?? '—';
      if (key === 'userHubs') return value?.length ?? '—';
      if (key === 'createdAt' || key === 'updatedAt') {
        return new Date(value).toLocaleString();
      }
      return value ?? '—';
    }
  }));
};

export default function Table(props) {
  const { data = [], navigateTo } = props;
  const { t } = useLocale();

  const columns = useMemo(() => createColumns(t), [t]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (!data.length) {
    return <div className="p-4 text-gray-500">{t['users.anyUsers']}</div>
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="text-left text-sm font-medium text-gray-600 p-3 border-b"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              onClick={() => navigateTo?.(row.original.id)}
              className="cursor-pointer hover:bg-gray-50 transition"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="p-3 text-sm text-gray-800 border-b"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}