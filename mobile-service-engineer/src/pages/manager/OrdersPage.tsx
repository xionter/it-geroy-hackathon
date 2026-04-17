import { useState } from 'react';
import { useManager } from '../../hooks/useManager';
import PriorityBadge from '../../components/ui/PriorityBadge';
import StatusBadge from '../../components/ui/StatusBadge';
import type { OrderStatus, Priority } from '../../types';

const ALL = 'all';

export default function OrdersPage() {
  const { orders, engineers, assignOrder, setPriority } = useManager();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>(ALL);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [priorityId, setPriorityId] = useState<string | null>(null);

  const filtered = orders.filter(
    (o) => statusFilter === ALL || o.status === statusFilter
  ).sort((a, b) => {
    const w = { urgent: 0, medium: 1, planned: 2 } as const;
    return w[a.priority] - w[b.priority];
  });

  const statusTabs: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'assigned', label: 'К выполнению' },
    { key: 'in_progress', label: 'В работе' },
    { key: 'completed', label: 'Выполнено' },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Заявки</h2>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              statusFilter === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-400 border-b border-zinc-800">
              <th className="text-left p-4 font-medium">Приоритет</th>
              <th className="text-left p-4 font-medium">Оборудование / Адрес</th>
              <th className="text-left p-4 font-medium">Статус</th>
              <th className="text-left p-4 font-medium">Инженер</th>
              <th className="text-left p-4 font-medium">Время</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const engineer = order.assignedEngineerId
                ? engineers.find((e) => e.id === order.assignedEngineerId)
                : null;

              return (
                <tr key={order.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                  <td className="p-4">
                    {priorityId === order.id ? (
                      <select
                        autoFocus
                        value={order.priority}
                        onChange={(e) => { setPriority(order.id, e.target.value as Priority); setPriorityId(null); }}
                        onBlur={() => setPriorityId(null)}
                        className="bg-zinc-700 rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="urgent">СРОЧНО</option>
                        <option value="medium">СРЕДНИЙ</option>
                        <option value="planned">ПЛАНОВО</option>
                      </select>
                    ) : (
                      <button onClick={() => setPriorityId(order.id)}>
                        <PriorityBadge priority={order.priority} />
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{order.equipment}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{order.address}</p>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4">
                    {assigningId === order.id ? (
                      <select
                        autoFocus
                        value={order.assignedEngineerId ?? ''}
                        onChange={(e) => { assignOrder(order.id, e.target.value || null); setAssigningId(null); }}
                        onBlur={() => setAssigningId(null)}
                        className="bg-zinc-700 rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="">Не назначен</option>
                        {engineers.filter(e => e.status !== 'offline').map((e) => (
                          <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                      </select>
                    ) : (
                      <button
                        onClick={() => setAssigningId(order.id)}
                        className={`text-sm hover:underline ${engineer ? 'text-white' : 'text-red-400'}`}
                      >
                        {engineer ? engineer.name : 'Назначить'}
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-zinc-400">{order.scheduledTime}</td>
                  <td className="p-4 text-zinc-500 text-xs">Создан {order.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
