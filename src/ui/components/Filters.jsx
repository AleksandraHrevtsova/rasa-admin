import { memo } from 'react';
import { useI18n } from '@/ui/hooks/useI18n';
import { Search } from 'lucide-react';

function FiltersComponent({ filters, setFilters, setPagination }) {
  const { t, k } = useI18n();

  const handleChange = (e) => {
    const v = e.target.value;
    setPagination(p => ({ ...p, pageIndex: 0 }));
    setFilters(p => ({ ...p, search: v }));
  };

  return (
    <div className='relative w-full mb-2'>
      <Search
        size={18}
        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
      />
      <input
        type='text'
        placeholder={t(k.common.search)}
        value={filters.search}
        onChange={handleChange}
        className='border p-2 pl-9 rounded w-full'
      />
    </div>
  );
};

export const Filters = memo(FiltersComponent);