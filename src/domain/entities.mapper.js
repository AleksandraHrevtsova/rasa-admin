import { pageTags } from '@/config/constants';

import { mapUserFromApi, mapUserToApi } from '@/domain/user/user.mapper';
import { mapProductFromApi, mapProductToApi } from '@/domain/product/product.mapper';
import { mapCounterpartyFromApi, mapCounterpartyToApi } from '@/domain/counterparty/counterparty.mapper';

export const mappers = (entity) => {
  const mapper = {
    fromApi: null,
    toApi: null,
  }

  if (entity === pageTags.user) {
    mapper.fromApi = mapUserFromApi;
    mapper.toApi = mapUserToApi;
  }

  if (entity === pageTags.product) {
    mapper.fromApi = mapProductFromApi;
    mapper.toApi = mapProductToApi;
  }

  if (entity === pageTags.counterparty) {
    mapper.fromApi = mapCounterpartyFromApi;
    mapper.toApi = mapCounterpartyToApi;
  }

  return mapper;
};