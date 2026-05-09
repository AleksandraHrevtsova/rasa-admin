import { getCounterparties } from '@/domain/counterparty/counterparty.service';
import { getCounterpartyColumns } from '@/domain/counterparty/counterparties.table';
import { toggleCounterpartyActive } from '@/domain/counterparty/counterparty.mutations';

export const counterpartiesEntity = (ctx) => ({
  key: ctx.pageTags.counterparties,
  title: ctx.k.counterparties.title,

  fetchFn: getCounterparties,
  columns: getCounterpartyColumns,

  paths: {
    list: ctx.nav.conterparties,
    create: ctx.nav.newCounterparty,
    edit: ctx.nav.editCounterparty,
  },
  
  toggle: {
    mutationFn: toggleCounterpartyActive,
    errorMessage: ctx.k.common.toggleActiveError,
  },
});