import { activateProduct, deactivateProduct } from '@/domain/product/product.service';

export const toggleProductActive = ({ id, isActive }) => {
  return isActive ? deactivateProduct(id) : activateProduct(id);
};