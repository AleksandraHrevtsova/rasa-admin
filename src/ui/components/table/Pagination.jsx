import { 
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight, 
} from 'lucide-react';
import { useI18n } from '@/ui/hooks/useI18n';
import { styleTokens } from '@/ui/tokens/form.tokens';

const ArrowButton = ({ onClick, isDisabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={styleTokens.pagination.arrowButton}
    >
      {children}
    </button>
  );
};

export const Pagination = ({
  pageCount,
  pagination,
  setPagination,
  pageSizeOptions,
}) => {
  const { t, k } = useI18n();
  const pageIndex = pagination.pageIndex;

  const canPrev = pageIndex > 0;
  const canNext = pageIndex < pageCount - 1;

  const handleStart = () => setPagination(p => ({ ...p, pageIndex: 0 }));
  const handlePrev = () => setPagination(p => ({ ...p, pageIndex: Math.max(0, p.pageIndex - 1) }));
  const handleNext = () => setPagination(p => ({ ...p, pageIndex: Math.min(pageCount - 1, p.pageIndex + 1) }));
  const handleEnd = () => setPagination(p => ({ ...p, pageIndex: pageCount - 1  }));
  const handleSelect = (e) => setPagination(p => ({ ...p, pageSize: Number(e.target.value), pageIndex: 0 }));

  return (
    <div className={styleTokens.pagination.wrapper1}>
      <div className={styleTokens.pagination.wrapper2}>
        <div className={styleTokens.pagination.arrowBlock}>
          <ArrowButton onClick={handleStart} isDisabled={!canPrev}>
            <ChevronsLeft size={16} />
          </ArrowButton>

          <ArrowButton onClick={handlePrev} isDisabled={!canPrev}>
            <ChevronLeft size={16} />
          </ArrowButton>

          <div className='px-3 text-sm text-gray-700 font-medium min-w-17,5 text-center'>
            {pageIndex + 1} / {pageCount || 1}
          </div>

          <ArrowButton onClick={handleNext} isDisabled={!canNext}>
            <ChevronRight size={16} />
          </ArrowButton>

          <ArrowButton onClick={handleEnd} isDisabled={!canNext}>
            <ChevronsRight size={16} />
          </ArrowButton>
        </div>

        <div className={styleTokens.pagination.countBlock}>
          <span className={styleTokens.pagination.content}>
            {t(k.common.rows)}
          </span>

          <select
            value={pagination.pageSize}
            onChange={handleSelect}
            className={styleTokens.pagination.select}
          >
            {pageSizeOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
        </div>
      </div>
    </div>
  );
};