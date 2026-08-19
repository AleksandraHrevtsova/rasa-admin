import { pageTags } from '@/config/constants';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Orders() {
  return (
    <EntityPage
      entity={pageTags.orders}
    />
  );
};