import { NAV, pageTags } from '@/config/constants';
import { getCounterpartyColumns } from '@/domain/counterparty/counterparties.table';
import { getCounterparties } from '@/domain/counterparty/counterparty.service';
import { useI18n } from '@/ui/hooks/useI18n';
import { useToggleCounterpartyActive } from '@/ui/hooks/useToggleCounterpartyActive';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Counterparties() {
  const { t, k } = useI18n();
  const toggleActive = useToggleCounterpartyActive(pageTags.counterparties);

  return (
    <EntityPage
      entityKey={pageTags.conterparties}
      title={t(k.counterparties.title)}
      fetchFn={getCounterparties}
      getColumns={getCounterpartyColumns}
      onToggle={(row) => {
        toggleActive.mutate({ id: row.id, isActive: row.isActive });
      }}
      getPaths={() => ({
        listPath: NAV.products,
        createPath: NAV.newProduct,
        editPath: NAV.editProduct,
      })}
    />
  );
};
