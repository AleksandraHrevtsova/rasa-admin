import { Plus, ShieldCheck, ShieldClose } from 'lucide-react';
import { buttonActionTypes } from "@/config/constants";

import { FAB } from '@/ui/components/Fab';
import { Loading } from '@/ui/components/Loading';
import { Button } from '@/ui/components/Button';

import { useI18n } from '@/ui/hooks/useI18n';

export function EntityPageLayout(props) {
  const { title, actions, table, loading, fab } = props;
  const { t, k } = useI18n();

  if (loading) return <Loading />;

  return (
    <>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-bold text-blue-950'>
              {title}
            </h1>

            {actions?.left && (
              <Button
                label={actions.left.isActive ? t(k.common.showInactive) : t(k.common.showActive)}
                onClick={actions.left.onClick} 
                action={buttonActionTypes.show} 
                icon={actions.left.isActive ? ShieldCheck : ShieldClose}
                hideLabelOnMobile
              />
            )}
          </div>
          <div className='hidden md:flex items-center gap-2'>
            {actions?.right && (
              <Button
                label={t(k.common.create)} 
                onClick={actions.right.onClick} 
                action={buttonActionTypes.create} 
                icon={Plus}
              />
            )}
          </div>
        </div>
        {table}
      </div>
      {fab && (<FAB label={t(k.common.create)} onClick={fab.onClick} />)}
    </>
  );
};