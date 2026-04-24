import { activateUser, deactivateUser } from "@/domain/user/user.service";

export const toggleUserActive = ({ id, isActive }) => {
  return isActive ? deactivateUser(id) : activateUser(id);
};