import { activateCounterparty, deactivateCounterparty } from '@/domain/counterparty/counterparty.service';

export const toggleCounterpartyActive = ({ id, isActive }) => {
  return isActive ? deactivateCounterparty(id) : activateCounterparty(id);
};