import { activateOrganization, deactivateOrganization } from '@/domain/organization/organization.service';

export const toggleOrganizationActive = ({ id, isActive }) => {
  return isActive ? deactivateOrganization(id) : activateOrganization(id);
};