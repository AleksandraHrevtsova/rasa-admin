import { createEntity } from '@/core/registry/createEntity';
import { productsEntity } from './products.entity';
import { productForm } from '@/domain/product/product.form';

export const products = createEntity(productsEntity);
export const product = createEntity(productForm);