import { createEntity } from "@/core/registry/createEntity";
import { counterpartiesEntity } from "@/domain/counterparty/counterparties.entity";
import { counterpartyForm } from '@/domain/counterparty/counterparty.form';

export const counterparties = createEntity(counterpartiesEntity);
export const counterparty = createEntity(counterpartyForm);
