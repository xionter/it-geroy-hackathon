import { useLocation, useNavigate } from 'react-router-dom';
import { ClipboardList, Map, Package, MessageCircle } from 'lucide-react';

const tabs = [
  { path: '/engineer', icon: ClipboardList, label: 'Заявки' },
  { path: '/engineer/map', icon: Map, label: 'Карта' },
  { path: '/engineer/parts', icon: Package, label: 'Склад' },
  { path: '/engineer/chat', icon: MessageCircle, label: 'Чат' },
];

export default function BottomNav() {
  const location = useLocation();
  const nav = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-zinc-950/90 backdrop-blur-sm border-t border-zinc-800 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const active =
        tab.path === '/engineer'
          ? location.pathname === '/engineer'
          : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => nav(tab.path)}
              className={`flex flex-col items-center py-2 px-3 min-w-[64px] min-h-[48px] ${
                active ? 'text-blue-400' : 'text-zinc-500'
              }`}
            >
              <tab.icon size={22} />
              <span className="text-[11px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
