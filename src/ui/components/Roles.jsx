import { useI18n } from '@/ui/hooks/useI18n';

const List = (props) => {
  const { data, title } = props; 

  return (
    <div className='bg-white border rounded-xl p-3'>
      {title && (
        <h2 className='text-sm font-semibold mb-2'>
          {title}
        </h2>
      )}
      <div className='flex flex-col gap-2'>
        {data?.map((el) => (
          <div
            key={el.id}
            className='p-2 border rounded-lg text-sm'
          >
            <div className='font-medium text-blue-950'>
              {el.name}
            </div>
            <div className='text-gray-500 text-xs'>
              {el.description || '—'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function RolesList({ roles = [] }) {
  const { t, k } = useI18n();

  return (
    <>
      <div className='hidden lg:block'>
        <List data={roles} title={t(k.users.roles)} />
      </div>
      <div className='mt-4 lg:hidden'>
        <List data={roles} title={t(k.users.roles)} />
      </div>
    </>
  );
}