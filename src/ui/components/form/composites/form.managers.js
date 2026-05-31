import { CheckboxListManager } from '@/ui/components/form/composites/CheckboxListManager';
import { OrganizationsManager } from '@/ui/components/form/composites/OrganizationsManager';
import { EmployeesManager } from '@/ui/components/form/composites/EmployeesManager';
import { HubsManager } from '@/ui/components/form/composites/HubsManager';

import { OrganizationBankAccountsManager } from '@/ui/components/form/composites/OrganizationBankAccountsManager';

import { compositeBlocks } from '@/config/constants';

export const managerComponents = {
  [compositeBlocks.paymentTypes]: CheckboxListManager,
  [compositeBlocks.products]: CheckboxListManager,
  
  [compositeBlocks.employees]: EmployeesManager,
  [compositeBlocks.hubs]: HubsManager,

  [compositeBlocks.organizations]: OrganizationsManager,
  [compositeBlocks.bankAccounts]: OrganizationBankAccountsManager,
};