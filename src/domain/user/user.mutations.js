import { activateUser, deactivateUser } from "@/domain/user/user.service";

export const toggleUserActive = ({ id, isActive }) => {
  console.log('toggleUserActive:', id);
  return isActive ? deactivateUser(id) : activateUser(id);
};