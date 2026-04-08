import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from 'sonner';

import { NAV } from '../constants/navigation';
import { ProtectedRoute } from "./ProtectedRoute";

import Login from "../pages/Login";
import Users from "../pages/Users";
import User from "../pages/User";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path={NAV.login} element={<Login />} />
        <Route path={NAV.home} element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path={NAV.users} element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path={NAV.newUser} element={<ProtectedRoute><User /></ProtectedRoute>} />
        <Route path={NAV.editUser} element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}