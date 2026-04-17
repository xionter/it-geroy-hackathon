import { useState } from 'react';
import Header from '../../components/ui/Header';
import OrderCard from '../../components/orders/OrderCard';
import { useOrders } from '../../hooks/useOrders';
import { useAuth } from '../../hooks/useAuth';
import type { OrderStatus } from '../../types';

const tabs: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'assigned', label: 'К выполнению' },
  { key: 'in_progress', label: 'В работе' },
  { key: 'completed', label: 'Выполнено' },
];

const priorityWeight = { urgent: 0, medium: 1, planned: 2 } as const;

export default function EngineerDashboard() {
  const { orders } = useOrders();
  const { worker, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');

  const filtered = orders
    .filter((o) => activeTab === 'all' || o.status === activeTab)
    .sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);

  return (
    <>
      <Header title="Мои заявки" />
      <div className="px-4">
        <div className="bg-zinc-900 rounded-2xl p-4 mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-zinc-400">Работник на смене</p>
            <p className="font-semibold truncate">{worker?.name}</p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-zinc-400 active:text-white min-h-[44px] px-3 rounded-xl active:bg-zinc-800"
          >
            Выйти
          </button>
        </div>

        <p className="text-zinc-400 text-sm mb-4">
          Сегодня: {orders.filter((o) => o.status !== 'completed').length} активных
        </p>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap min-h-[44px] transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="mt-4 space-y-3 pb-4">
          {filtered.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">Нет заявок</p>
          ) : (
            filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
