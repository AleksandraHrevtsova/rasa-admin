import { pageTags } from '@/config/constants';
import { EntityFormPage } from '@/ui/pages/EntityFormPage';

export default function Organization() {
  return (
    <EntityFormPage
      entity={pageTags.organization}
    />
  );
};