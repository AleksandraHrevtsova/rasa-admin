import { pageTags } from '@/config/constants';

import { userMapper } from '@/domain/user/user.mapper';
import { productMapper } from '@/domain/product/product.mapper';
import { counterpartyMapper } from '@/domain/counterparty/counterparty.mapper';

export const mappers = (entity) => {
  const mapper = {
    fromApi: null,
    toApi: null,
  }

  if (entity === pageTags.user) {
    mapper.fromApi = userMapper.fromApi;
    mapper.toApi = userMapper.toApi;
  }

  if (entity === pageTags.product) {
    mapper.fromApi = productMapper.fromApi;
    mapper.toApi = productMapper.toApi;
  }

  if (entity === pageTags.counterparty) {
    mapper.fromApi = counterpartyMapper.fromApi;
    mapper.toApi = counterpartyMapper.toApi;
  }

  return mapper;
};