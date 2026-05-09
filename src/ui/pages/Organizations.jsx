import { pageTags } from '@/config/constants';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Organizations() {
  return (
    <EntityPage
      entity={pageTags.organizations}
    />
  );
};