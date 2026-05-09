import { createRegistryContext } from "@/core/registry/registry.context";

import { users } from "@/domain/user";
import { products } from "@/domain/product";
import { counterparties } from "@/domain/counterparty";
import { organizations } from "@/domain/organization";

const ctx = createRegistryContext();

export const entities = {
  users: users(ctx),
  products: products(ctx),
  counterparties: counterparties(ctx),
  organizations: organizations(ctx),
};