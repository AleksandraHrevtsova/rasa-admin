import { pageTags } from '@/config/constants';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Counterparties() {
  return (
    <EntityPage
      entity={pageTags.counterparties}
    />
  );
};
