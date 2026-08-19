import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  ShoppingCart,
  Home,
  List,
  ListCheck,
  Building,
  Building2,
  Package,
  CreditCard,
  Award,
  Menu,
  ChevronLeft,
  LogOut
} from 'lucide-react';

import { useAuth } from '@/core/auth/hooks/useAuth';
import { useI18n } from '@/ui/hooks/useI18n';
import { logout } from '@/core/auth/services/auth.service';

import { NAV } from '@/config/constants';
import { LanguageSwitcher } from '@/ui/components/LanguageSwitcher';

function SidebarItem({ item, collapsed, onClick }) {
  return (
    <NavLink to={item.path} onClick={onClick}>
      {({ isActive }) => {
        return (
          <motion.div
            layout
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${
              isActive ? 'bg-blue-950 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
  
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {item.label}
              </motion.span>
            )}
          </motion.div>
        );
      }}
    </NavLink>
  );
}

export const Layout = () => {
  const { appUser } = useAuth();
  const location = useLocation();
  const { t, k } = useI18n();

  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebar') === 'collapsed');

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebar', collapsed ? 'collapsed' : 'open');
  }, [collapsed]);

  const navItems = [
    { label: t(k.navigation.users), path: NAV.users, icon: Users },
    // { label: t(k.navigation.roles), path: NAV.roles, icon: UserCheck },
    { label: t(k.navigation.products), path: NAV.products, icon: Package },
    { label: t(k.navigation.counterparties), path: NAV.counterparties, icon: Building },
    // { label: t(k.navigation.hubs), path: NAV.hubs, icon: Home },

    { label: t(k.navigation.orders), path: NAV.orders, icon: ShoppingCart },
    // { label: t(k.navigation.payments), path: NAV.payments, icon: CreditCard },

    // { label: t(k.navigation.paymentTypes), path: NAV.paymentTypes, icon: List },
    { label: t(k.navigation.organizations), path: NAV.organizations, icon: Building2 },
    { label: t(k.navigation.requisites), path: NAV.requisites, icon: ListCheck },

    // { label: t(k.navigation.certificates), path: NAV.certificates, icon: Award },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      window.location.href = NAV.login;
    }
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <motion.div
        animate={{ width: collapsed ? 70 : 220 }}
        className='hidden md:flex flex-col border-r p-2 bg-white'
      >
        <div className={`flex justify-${collapsed ? 'start' : 'end'} mb-2 p-2`}>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu /> : <ChevronLeft />}
          </button>
        </div>

        <div className='flex flex-col gap-2'>
          {navItems.map(item => {
            return  (<SidebarItem key={item.path} item={item} collapsed={collapsed}/>)
          })}
        </div>

        <div className='mt-auto flex flex-col gap-2'>
          <LanguageSwitcher />
          {!collapsed && <div className='text-xl p-2'>{appUser?.name}</div>}

          <SidebarItem
            key={'logout'}
            item={{ label: t(k.auth.logout), path: '#', icon: LogOut }}
            collapsed={collapsed}
            onClick={handleLogout}
          />
        </div>
      </motion.div>
      {/* ---------------- MAIN ---------------- */}
      <div className='flex-1 flex flex-col min-h-0'>

        {/* MOBILE TOPBAR */}
        <div className='md:hidden flex items-center justify-between px-3 py-2 border-b'>
          <div className='text-xs font-medium truncate max-w-24'>
            {appUser?.name}
          </div>

          <div className='flex items-center gap-3'>
            <LanguageSwitcher compact />

            <button onClick={() => setMenuOpen(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className='flex-1 overflow-y-auto p-4'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-black/40 z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className='fixed left-0 top-0 bottom-0 w-64 bg-white z-50 p-3 flex flex-col'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
            >
              <div className='flex flex-col gap-2 mt-10'>
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100'
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>

              <div className='mt-auto pt-4 border-t'>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-red-500'
                >
                  <LogOut size={18} />
                  {t(k.auth.logout)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};