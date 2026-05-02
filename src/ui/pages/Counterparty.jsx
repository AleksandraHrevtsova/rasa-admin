import { pageTags } from '@/config/constants';
import { EntityFormPage } from '@/ui/pages/EntityFormPage';

export default function Counterparty() {
  return (
    <EntityFormPage
      entity={pageTags.counterparty}
    />
  );
};