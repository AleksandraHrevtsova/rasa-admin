import { flexRender } from '@tanstack/react-table';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown,
} from 'lucide-react';

import { styleTokens } from '@/ui/tokens/form.tokens';

const Sorting = ({ header }) => {
  return (
    <>
      {{
        asc: <ArrowUp size={styleTokens.table.arrowSize} className={styleTokens.table.arrowColor} />,
        desc: <ArrowDown size={styleTokens.table.arrowSize} className={styleTokens.table.arrowColor} />,
      }[header.column.getIsSorted()] ?? (
        <ArrowUpDown size={styleTokens.table.arrowSize} className={styleTokens.table.arrowColor} />
      )}
    </>
  );
};

export const DesktopTable = ({ table, onRowClick, highlightedRows }) => {
  return (
    <div className={styleTokens.table.desktopTableWrapper}>
      <table className={styleTokens.table.desktop}>

        <thead className={styleTokens.table.headWrapper}>
          {table.getHeaderGroups().map((hg, ci) => (
            <tr key={hg.id || ci}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${styleTokens.table.headLabel} ${header.column.getCanSort() ? styleTokens.cursor.pointer : styleTokens.cursor.none}`}
                  style={{ width: header.column.columnDef.size }}
                  onClick={ header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined }
                >
                  <div className={styleTokens.table.arrowBlock}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <Sorting header={header} />
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
              className={`${styleTokens.table.rowWrapper} 
                ${highlightedRows.has(row.original.id) ? styleTokens.table.rowHighlighted : ''}
              `}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td 
                  key={cell.id} 
                  className={styleTokens.table.rowContent}
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
  );
};