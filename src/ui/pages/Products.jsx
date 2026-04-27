import { NAV, pageTags } from '@/config/constants';
import { getProductColumns } from '@/domain/product/products.table';
import { getProducts} from '@/domain/product/product.service';
import { useI18n } from '@/ui/hooks/useI18n';
import { useToggleProductActive } from '@/ui/hooks/useToggleProductActive';
import { EntityPage } from '@/ui/pages/EntityPage';

export default function Products() {
  const { t, k } = useI18n();
  const toggleActive = useToggleProductActive(pageTags.products);

  return (
    <EntityPage
      entityKey={pageTags.products}
      title={t(k.products.title)}
      fetchFn={getProducts}
      getColumns={getProductColumns}
      onToggle={(row) => {
        toggleActive.mutate({ id: row.id, isActive: row.isActive });
      }}
      getPaths={() => ({
        listPath: NAV.products,
        createPath: NAV.newProduct,
        editPath: NAV.editProduct,
      })}
    />
  );
}