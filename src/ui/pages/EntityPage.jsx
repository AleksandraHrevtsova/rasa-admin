import { entities } from '@/domain/entities.registry';
import { useI18n } from '@/ui/hooks/useI18n';
import { useAuth } from '@/core/auth/hooks/useAuth';
import { BaseEntityPage } from '@/ui/pages/BaseEntityPage';
import { useToggleActive } from '@/ui/hooks/useToggleActive';

export function EntityPage({ entity }) {
  const { appUser } = useAuth();
  const { t, k } = useI18n();
  const config = entities[entity];
  const toggle = useToggleActive({
    queryKey: config.key,
    mutationFn: config.toggle?.mutationFn,
    errorMessage: config.toggle?.errorMessage,
  });
  const sideData = config.useSideData?.() || {};
  const columns = config.columns({
    t,
    k,
    appUser,
    onClick: toggle.mutate,
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