import {
  getProductById,
  createProduct,
  updateProduct,
  activateProduct,
  deactivateProduct,
} from '@/domain/product/product.service';

import { fields } from '@/domain/product/product.fields';

import { productMapper } from '@/domain/product/product.mapper';
import { normalizeProduct } from '@/domain/product/product.compare';

import { useProductFormDerived } from '@/domain/product/hooks/useProductFormDerived';
import { formConfig } from '@/domain/product/product.form.config';

export const productForm = (ctx) => {
  return {
    key: ctx.pageTags.product,

    paths: {
      list: ctx.nav.products,
      create: ctx.nav.newProduct,
      edit: ctx.nav.editProduct,
    },

    api: {
      getById: getProductById,
      create: createProduct,
      update: updateProduct,
      activate: activateProduct,
      deactivate: deactivateProduct,
    },

    fieldNames: fields,

    hooks: {
      useData: () => ({}),
    },

    mapper: {
      fromApi: productMapper.fromApi,
      toApi: productMapper.toApi,
      normalize: normalizeProduct,
    },

    useDerived: useProductFormDerived,
    config: formConfig,
  };
};