import { pageTags } from '@/config/constants';
import { EntityFormPage } from '@/ui/pages/EntityFormPage';

export default function Product() {
  return (
    <EntityFormPage
      entity={pageTags.product}
    />
  );
};