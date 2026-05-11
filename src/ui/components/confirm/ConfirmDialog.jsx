import { useI18n } from '@/ui/hooks/useI18n';

export function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  variant = 'danger',
}) {
  const { t, k } = useI18n();

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl p-4 w-105 shadow-lg'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>

        {description && (
          <p className='text-sm text-gray-600 mb-4'>{description}</p>
        )}

        <div className='flex justify-end gap-2'>
          <button onClick={onCancel} className='px-3 py-1 text-sm'>
            {t(k.common.cancel)}
          </button>

          <button
            onClick={onConfirm}
            className={`px-3 py-1 text-sm rounded ${
              variant === 'danger'
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 text-white'
            }`}
          >
            {t(k.common.confirm)}
          </button>
        </div>
      </div>
    </div>
  );
}