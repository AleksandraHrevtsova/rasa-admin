import { pageTags } from '@/config/constants';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Products() {
  return (
    <EntityPage
      entity={pageTags.products}
    />
  );
};