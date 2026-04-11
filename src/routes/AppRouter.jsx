import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from 'sonner';

import { NAV } from '../constants/navigation';
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "../components/Navigation";
import { ErrorBoundary } from "../components/ErrorBoundary";

import Login from "../pages/Login";
import Users from "../pages/Users";
import User from "../pages/User";
import Counterparties from "../pages/Counterparties";
import Products from "../pages/Products";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <ErrorBoundary>
        <Routes>
          <Route path={NAV.login} element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path={NAV.home} element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path={NAV.users} element={<Users />} />

            <Route path={NAV.users} element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path={NAV.newUser} element={<ProtectedRoute><User /></ProtectedRoute>} />
            <Route path={NAV.editUser} element={<ProtectedRoute><User /></ProtectedRoute>} />

            <Route path={NAV.counterparties} element={<ProtectedRoute><Counterparties /></ProtectedRoute>} />
            <Route path={NAV.newCounterparty} element={<ProtectedRoute><Counterparties /></ProtectedRoute>} />
            <Route path={NAV.editCounterparty} element={<ProtectedRoute><Counterparties /></ProtectedRoute>} />

            <Route path={NAV.roles} element={<Products />} />
            <Route path={NAV.products} element={<Products />} />
            <Route path={NAV.orders} element={<Products />} />
            <Route path={NAV.payments} element={<Products />} />
            <Route path={NAV.certificates} element={<Products />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}