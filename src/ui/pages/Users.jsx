import { pageTags } from '@/config/constants';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Users() {
  return (
    <EntityPage
      entity={pageTags.users}
    />
  );
};