import { entities } from '@/domain/entities.registry';
import { useI18n } from '@/ui/hooks/useI18n';
import { BaseEntityPage } from '@/ui/pages/BaseEntityPage';

export function EntityPage({ entity }) {
  const { t } = useI18n();
  const config = entities[entity];
  const toggle = config.toggleHook(config.key);
  const sideData = config.useSideData?.() || {};
  const columns = config.columns({
    t,
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