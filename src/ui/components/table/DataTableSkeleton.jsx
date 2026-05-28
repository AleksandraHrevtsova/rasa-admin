import { styleTokens } from '@/ui/tokens/form.tokens';

export function DataTableSkeleton({ columns = [], rows = 8 }) {
  return (
    <div className={styleTokens.table.skeletonTableWrapper}>
      <table className={styleTokens.table.desktop}>
        <thead className={styleTokens.table.skeletonTableHead}>
          <tr>
            {columns.map((col, ci) => (
              <th key={col.key || ci} className={styleTokens.table.label}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className={styleTokens.table.skeletonRow}>
              {columns?.map((col, ci) => {
                let w = styleTokens.table.cellWidths.full;
                if (ci === 0) w = styleTokens.table.cellWidths.regular;
                if (ci === columns.length - 1) w = styleTokens.table.cellWidths.small;

                return (
                  <td key={col.key || ci} className={styleTokens.table.cellPadding}>
                    <div 
                      className={styleTokens.table.shimmer}
                      style={{ width: w }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}