import { createEntity } from '@/core/registry/createEntity';
import { organizationsEntity } from './organizations.entity';
import { organizationForm } from '@/domain/organization/organization.form';

export const organizations = createEntity(organizationsEntity);
export const organization = createEntity(organizationForm);
