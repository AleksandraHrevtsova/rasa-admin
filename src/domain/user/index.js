import { createEntity } from "@/core/registry/createEntity";
import { usersEntity } from "@/domain/user/users.entity";
import { userForm } from '@/domain/user/user.form';

export const users = createEntity(usersEntity);
export const user = createEntity(userForm)