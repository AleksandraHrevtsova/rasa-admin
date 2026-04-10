import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Shield,
  Building2,
  Package,
  FileText,
  CreditCard,
  Award,
  Menu,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";
import { clearToken } from "../auth/tokenManager";

import { NAV } from "../constants/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

function SidebarItem({ item, collapsed }) {

  return (
    <NavLink to={item.path}>
      {({ isActive }) => {
        return (
          <motion.div 
            layout 
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition ${
              isActive ? "bg-blue-950 text-white" : "hover:bg-gray-100"
            }`}>
            <item.icon size={20} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >{item.label}</motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )
      }}
    </NavLink>
  );
}

export const Layout = () => {
  const { appUser } = useAuth();
  const location = useLocation();
  const { t } = useLocale();

  const [collapsed, setCollapsed] = useState(localStorage.getItem('sidebar') === 'collapsed');

  useEffect(() => {
    localStorage.setItem('sidebar', collapsed ? 'collapsed' : 'open');
  }, [collapsed]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'm') {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function formatLabel(key) {
    return t[`${key}.title`] || key;
  };

  function logout() {
    localStorage.clear();
    clearToken();
    navigate(NAV.login);
  };

  const navItems = [
    { label: formatLabel('users'), path: NAV.users, icon: Users },
    { label: formatLabel('roles'), path: NAV.roles, icon: Shield },
    { label: formatLabel('counterparties'), path: NAV.counterparties, icon: Building2 },
    { label: formatLabel('products'), path: NAV.products, icon: Package },
    { label: formatLabel('orders'), path: NAV.orders, icon: FileText },
    { label: formatLabel('payments'), path: NAV.payments, icon: CreditCard },
    { label: formatLabel('certificates'), path: NAV.certificates, icon: Award },
  ];

  return (
    <div className="flex h-screen">
      <motion.div animate={{ width: collapsed ? 70 : 220 }} className='hidden md:flex flex-col border-r p-2 bg-white'>
        <div className={`flex justify-${collapsed ? 'start' : 'end'} mb-2 p-2`}>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <Menu /> : <ChevronLeft />}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {navItems.map(item => (<SidebarItem key={item.path} item={item} collapsed={collapsed}/>))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <LanguageSwitcher />
          {!collapsed && (<div className="text-xl p-2">{appUser.name}</div>)}
          {appUser && (
             <SidebarItem 
              key={NAV.login} 
              item={{ label: t['logout.title'], path: NAV.login, icon: LogOut }} 
              collapsed={collapsed}
            />
          )}
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col">
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b flex items-center justify-between px-3 py-2 z-50">
          {/* NAV ICONS */}
          <div className="flex gap-4">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                onClick={logout}
              >
                {({ isActive }) => (
                  <item.icon
                    size={22}
                    className={isActive ? 'text-blue-950' : 'text-gray-400'}
                  />
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE CONTROLS */}
          <div className="flex items-center gap-3">
            
            {/* LANGUAGE SWITCHER */}
            <LanguageSwitcher compact />

            {/* USER + LOGOUT */}
            {appUser && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700 max-w-20 truncate">
                  {appUser.name}
                </span>

                <button onClick={logout} className="text-red-500">
                  <LogOut size={18} />
                </button>
              </div>
            )}

          </div>
        </div>
        <div className="p-4 mt-12 md:mt-0">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Outlet/>
          </motion.div>
        </div>
      </div>
    </div>
  )
}