import { pageTags } from '@/config/constants';
import { EntityFormPage } from '@/ui/pages/EntityFormPage';

export default function Order() {
  return (
    <EntityFormPage
      entity={pageTags.order}
    />
  );
};