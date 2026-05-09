import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';

import { NAV } from '@/config/constants';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { Layout } from '@/ui/components/Navigation';
import { ErrorBoundary } from '@/ui/components/ErrorBoundary';

import Login from '@/ui/pages/Login';

import Users from '@/ui/pages/Users';
import User from '@/ui/pages/User';

import Products from '@/ui/pages/Products';
import Product from '@/ui/pages/Product';

import Counterparties from '@/ui/pages/Counterparties';
import Counterparty from '@/ui/pages/Counterparty';

import Organizations from '@/ui/pages/Organizations';
import Organization from '@/ui/pages/Organization';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
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

            <Route path={NAV.products} element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path={NAV.newProduct} element={<ProtectedRoute><Product /></ProtectedRoute>} />
            <Route path={NAV.editProduct} element={<ProtectedRoute><Product /></ProtectedRoute>} />
            
            <Route path={NAV.counterparties} element={<ProtectedRoute><Counterparties /></ProtectedRoute>} />
            <Route path={NAV.newCounterparty} element={<ProtectedRoute><Counterparty /></ProtectedRoute>} />
            <Route path={NAV.editCounterparty} element={<ProtectedRoute><Counterparty /></ProtectedRoute>} />

            <Route path={NAV.organizations} element={<ProtectedRoute><Organizations /></ProtectedRoute>} />
            <Route path={NAV.newOrganization} element={<ProtectedRoute><Organization /></ProtectedRoute>} />
            <Route path={NAV.editOrganization} element={<ProtectedRoute><Organization /></ProtectedRoute>} />

            <Route path={NAV.roles} element={<Products />} />
            <Route path={NAV.orders} element={<Products />} />
            <Route path={NAV.payments} element={<Products />} />
            <Route path={NAV.certificates} element={<Products />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}