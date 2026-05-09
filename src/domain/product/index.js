import { createEntity } from "@/core/registry/createEntity";
import { productsEntity } from "./products.entity";

export const products = createEntity(productsEntity);