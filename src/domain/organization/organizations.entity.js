import { getOrganizations } from '@/domain/organization/organization.service';
import { getOrganizationColumns } from '@/domain/organization/organizations.table';
import { toggleOrganizationActive } from '@/domain/organization/organization.mutations';

export const organizationsEntity = (ctx) => ({
  key: ctx.pageTags.organizations,
  title: ctx.k.organizations.title,

  fetchFn: getOrganizations,
  columns: getOrganizationColumns,

  paths: {
    list: ctx.nav.organizations,
    create: ctx.nav.newOrganization,
    edit: ctx.nav.editOrganization,
  },
  
  toggle: {
    mutationFn: toggleOrganizationActive,
    errorMessage: ctx.k.common.toggleActiveError,
  },
});