import { useState } from 'react';
import { useManager } from '../../hooks/useManager';
import PriorityBadge from '../../components/ui/PriorityBadge';
import StatusBadge from '../../components/ui/StatusBadge';
import type { OrderStatus, Priority } from '../../types';

const ALL = 'all';

export default function OrdersPage() {
  const { orders, engineers, assignOrders, setPriority } = useManager();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>(ALL);
  const [priorityId, setPriorityId] = useState<string | null>(null);
  const [selectedEngineerId, setSelectedEngineerId] = useState('');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [assignMessage, setAssignMessage] = useState('');

  const filtered = orders.filter(
    (o) => statusFilter === ALL || o.status === statusFilter
  ).sort((a, b) => {
    const w = { urgent: 0, medium: 1, planned: 2 } as const;
    return w[a.priority] - w[b.priority];
  });
  const activeEngineers = engineers.filter((e) => e.status !== 'offline');
  const selectableOrderIds = filtered
    .filter((order) => order.status !== 'completed')
    .map((order) => order.id);
  const selectedVisibleCount = selectedOrderIds.filter((id) => selectableOrderIds.includes(id)).length;
  const allVisibleSelected = selectableOrderIds.length > 0 && selectedVisibleCount === selectableOrderIds.length;

  const statusTabs: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'assigned', label: 'К выполнению' },
    { key: 'in_progress', label: 'В работе' },
    { key: 'completed', label: 'Выполнено' },
  ];

  const toggleOrder = (orderId: string) => {
    setAssignMessage('');
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleAllVisible = () => {
    setAssignMessage('');
    setSelectedOrderIds((prev) => {
      if (allVisibleSelected) {
        return prev.filter((id) => !selectableOrderIds.includes(id));
      }

      return Array.from(new Set([...prev, ...selectableOrderIds]));
    });
  };

  const handleAssign = () => {
    if (!selectedEngineerId || selectedOrderIds.length === 0) return;

    assignOrders(selectedOrderIds, selectedEngineerId);
    const engineer = engineers.find((item) => item.id === selectedEngineerId);
    setAssignMessage(`Назначено задач: ${selectedOrderIds.length}${engineer ? `, инженер: ${engineer.name}` : ''}`);
    setSelectedOrderIds([]);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Заявки</h2>

      <div className="bg-zinc-900 rounded-2xl p-4 space-y-4">
        <div>
          <h3 className="font-semibold">Распределение задач</h3>
          <p className="text-sm text-zinc-400 mt-1">
            Выберите работника, отметьте одну или несколько задач и закрепите их за ним
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(220px,320px)_1fr_auto] gap-3 items-end">
          <label className="block space-y-2">
            <span className="text-sm text-zinc-400">Работник</span>
            <select
              value={selectedEngineerId}
              onChange={(event) => {
                setSelectedEngineerId(event.target.value);
                setAssignMessage('');
              }}
              className="w-full bg-zinc-800 rounded-xl px-3 py-3 outline-none min-h-[48px]"
            >
              <option value="">Выберите работника</option>
              {activeEngineers.map((engineer) => (
                <option key={engineer.id} value={engineer.id}>
                  {engineer.name} · {engineer.completedToday}/{engineer.totalToday}
                </option>
              ))}
            </select>
          </label>

          <div className="text-sm text-zinc-400">
            Выбрано задач: <span className="text-white font-semibold">{selectedOrderIds.length}</span>
            {assignMessage && <p className="text-green-400 mt-1">{assignMessage}</p>}
          </div>

          <button
            onClick={handleAssign}
            disabled={!selectedEngineerId || selectedOrderIds.length === 0}
            className={`px-5 py-3 rounded-xl font-semibold min-h-[48px] ${
              selectedEngineerId && selectedOrderIds.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-zinc-800 text-zinc-500'
            }`}
          >
            Назначить
          </button>
        </div>
      </div>

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
              <th className="text-left p-4 font-medium w-12">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleAllVisible}
                  disabled={selectableOrderIds.length === 0}
                  className="w-4 h-4 accent-blue-600"
                  aria-label="Выбрать все задачи"
                />
              </th>
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
              const canSelect = order.status !== 'completed';
              const selected = selectedOrderIds.includes(order.id);

              return (
                <tr key={order.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleOrder(order.id)}
                      disabled={!canSelect}
                      className="w-4 h-4 accent-blue-600 disabled:opacity-30"
                      aria-label={`Выбрать задачу ${order.equipment}`}
                    />
                  </td>
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
                    <span className={engineer ? 'text-white' : 'text-red-400'}>
                      {engineer ? engineer.name : 'Не назначен'}
                    </span>
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
