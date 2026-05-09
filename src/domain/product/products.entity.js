import { getProducts} from '@/domain/product/product.service';
import { getProductColumns } from '@/domain/product/products.table';
import { toggleProductActive } from '@/domain/product/product.mutations';

export const productsEntity = (ctx) => ({
  key: ctx.pageTags.products,
  title: ctx.k.users.title,

  fetchFn: getProducts,
  columns: getProductColumns,

  paths: {
    list: ctx.nav.products,
    create: ctx.nav.newProduct,
    edit: ctx.nav.editProduct,
  },

  toggle: {
    mutationFn: toggleProductActive,
    errorMessage: ctx.k.common.toggleActiveError,
  },
});
