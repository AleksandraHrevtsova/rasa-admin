import { CheckboxListManager } from '@/ui/components/form/composites/CheckboxListManager';
import { OrganizationsManager } from '@/ui/components/form/composites/OrganizationsManager';
import { EmployeesManager } from '@/ui/components/form/composites/EmployeesManager';

import { compositeBlocks } from '@/config/constants';

export const managerComponents = {
  [compositeBlocks.paymentTypes]: CheckboxListManager,
  [compositeBlocks.products]: CheckboxListManager,
  [compositeBlocks.hubs]: CheckboxListManager,

  [compositeBlocks.organizations]: OrganizationsManager,
  [compositeBlocks.employees]: EmployeesManager,
};