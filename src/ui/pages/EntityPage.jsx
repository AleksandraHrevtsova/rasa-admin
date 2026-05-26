import { entities } from '@/domain/entities.registry';
import { useI18n } from '@/ui/hooks/useI18n';
import { BaseEntityPage } from '@/ui/pages/BaseEntityPage';
import { useToggleActive } from '@/ui/hooks/useToggleActive';
import { useCRUDnotification } from '@/ui/hooks/useCRUDnotification';

export function EntityPage({ entity }) {
  const { t, k } = useI18n();
  const config = entities[entity];
  const notifications = useCRUDnotification(entity);

  const toggle = useToggleActive({
    queryKey: config.key,
    mutationFn: config.toggle?.mutationFn ?? (() => Promise.resolve()),
    notifications,
  });
  const sideData = config.useSideData?.() || {};
  const columns = config.columns({
    t,
    k,
    ...sideData,
  });

  return (
    <BaseEntityPage
      entityKey={config.key} 
      title={t(config.title)}
      fetchFn={config.fetchFn}
      columns={columns}
      onToggle={toggle.mutate}
      paths={config.paths}
      renderSidebar={() => config.renderSidebar?.(sideData)}
    />
  );
};