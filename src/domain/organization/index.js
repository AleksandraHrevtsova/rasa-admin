import { createEntity } from "@/core/registry/createEntity";
import { organizationsEntity } from "./organizations.entity";

export const organizations = createEntity(organizationsEntity);