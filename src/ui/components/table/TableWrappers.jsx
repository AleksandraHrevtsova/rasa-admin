import { styleTokens } from '@/ui/tokens/form.tokens';

import { Pagination } from '@/ui/components/table/Pagination';

export const TableWrappers = ({ 
  isFetching,
  effectivePagination,
  pageCount,
  setPagination,
  pageSizeOptions,
  children, 
}) => {
  return (
    <div className={styleTokens.table.fullWidthWrapper}>
      {/* WRAPPER ДЛЯ OVERLAY */}
      <div className={`${styleTokens.table.overlayWrapper} ${
        isFetching ? styleTokens.table.overlayOpacityIsFetching : styleTokens.table.overlayOpacityFetched
      }`}>
        {children}
      </div>
      {(effectivePagination.total > effectivePagination.pageSize) && (
        <Pagination
          pageCount={pageCount}
          pagination={effectivePagination}
          setPagination={setPagination}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
};