import { pageTags } from '@/config/constants';
import { EntityFormPage } from '@/ui/pages/EntityFormPage';

export default function Users() {
  return (
    <EntityFormPage
      entity={pageTags.user}
    />
  );
};