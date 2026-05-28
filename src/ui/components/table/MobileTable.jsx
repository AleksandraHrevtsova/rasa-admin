import { styleTokens } from '@/ui/tokens/form.tokens';
import { defaultValues } from '@/config/constants';

export const MobileTable = ({ table, onRowClick, columns }) => {
  return (
    <div className={styleTokens.table.mobileWrapper}>
      {table.getRowModel().rows.map((row) => {
        const item = row.original;
        return (
          <div
            key={row.id}
            className={styleTokens.table.mobileTableBlock}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map((col, ci) => {
              const value = col.render ? col.render(item) : item[col.key];
              return (
                <div
                  key={col.key}
                  className={styleTokens.table.mobileCard}
                >
                  <span className={styleTokens.table.mobilCardLabel}>
                    {col.label}
                  </span>
            
                  <span className={styleTokens.table.mobilCardContent}>
                    {value ?? defaultValues.table}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};