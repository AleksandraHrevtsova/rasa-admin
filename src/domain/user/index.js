import { createEntity } from "@/core/registry/createEntity";
import { usersEntity } from "./users.entity";

export const users = createEntity(usersEntity);