import { useState, useEffect, useMemo } from "react";
import { useLocale } from "../contexts/LocaleContext";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { useNavigate } from 'react-router';

function formatHeader(key, t) {
  return t[`users.${key}`] || '';
  // return key
  //   .replace(/([A-Z])/g, ' $1')
  //   .replace(/^./, (str) => str.toUpperCase())
};

function createColums(data, t) {
  if (!data.length) return [];
  const included = ['name', 'phone', 'email', 'role', 'userHubs'];

  const dataKeys = Object.keys(data[0]);
  const filteredData = dataKeys.filter((key) => included.includes(key));

  const res = filteredData.map((key) => {
    const x = {
      accessorKey: key,
      header: formatHeader(key, t),
      cell: (info) => {
        const value = info.getValue()

        if (key === 'role') return value?.name || '—'
        if (key === 'userHubs') return value?.length || '—'
        // if (key === 'isActive') return value ? 'Yes' : 'No'
        if (key === 'createdAt' || key === 'updatedAt') {
          return new Date(value).toLocaleString();
        }

        return value ?? '—'
      }
    };
    return x;
  });

  return res;
}

export default function Table(props) {
  const { data =[], edit, deactivate } = props;
  const { t } = useLocale();
  const navigate = useNavigate();

  // const [rows, setRows] = useState();

  useEffect(() => {
    console.log('Users:', data);
    // console.log('t:', t[users]);

  }, [data]);

  const columns = useMemo(() => {
    return createColums(data, t);
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (!data.length) {
    return <div className="p-4 text-gray-500">No users</div>
  }

  return (
    // <div className="overflow-x-auto">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead className="bg-primary text-blue-950">
    //       <tr>
    //         {columns?.map((col) => {
    //           const tKey = `users.${col}`;
    //           return (
    //             <th key={col} className="px-4 py-2 text-left">{t[tKey]}</th>
    //           )
    //         })}
    //         <th className="px-4 py-2 text-left">{t["users.actions"]}</th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white divide-y divide-gray-200">
    //       {data?.map((u) => (
    //         <tr key={u.id}>
    //           <td className="px-4 py-2">{u.name}</td>
    //           <td className="px-4 py-2">{u.email}</td>
    //           <td className="px-4 py-2">{u.role?.name || ""}</td>
    //           <td className="px-4 py-2 space-x-2">
    //             <button
    //               className="bg-accent text-white px-2 py-1 rounded hover:bg-primary"
    //               onClick={() => edit(u)}
    //             >
    //               {t["edit"]}
    //             </button>
    //             <button
    //               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
    //               onClick={() => deactivate(u.id)}
    //             >
    //               {t["deactivate"]}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left text-sm font-medium text-gray-600 p-3 border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => navigate(`/users/${row.original.id}`)}
              className="cursor-pointer hover:bg-gray-50 transition"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-3 text-sm text-gray-800 border-b"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}