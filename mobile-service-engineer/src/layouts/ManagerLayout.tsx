import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  BarChart2,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/manager', icon: LayoutDashboard, label: 'Дашборд', end: true },
  { to: '/manager/orders', icon: ClipboardList, label: 'Заявки', end: false },
  { to: '/manager/engineers', icon: Users, label: 'Инженеры', end: false },
  { to: '/manager/warehouse', icon: Package, label: 'Склад', end: false },
  { to: '/manager/analytics', icon: BarChart2, label: 'Аналитика', end: false },
];

export default function ManagerLayout() {
  const { manager, logoutManager } = useAuth();

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <h1 className="text-lg font-bold">СервисПро</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{manager?.position}</p>
          <p className="text-sm text-zinc-300 mt-3 truncate">{manager?.name}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <button
            onClick={logoutManager}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
