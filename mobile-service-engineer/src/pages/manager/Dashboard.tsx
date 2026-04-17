import { useManager } from '../../context/ManagerContext';
import { AlertTriangle, CheckCircle, Users, Clock } from 'lucide-react';
import PriorityBadge from '../../components/ui/PriorityBadge';
import StatusBadge from '../../components/ui/StatusBadge';

const engineerStatusLabel: Record<string, { label: string; color: string }> = {
  active: { label: 'На выезде', color: 'bg-green-500' },
  idle: { label: 'Свободен', color: 'bg-yellow-500' },
  offline: { label: 'Офлайн', color: 'bg-zinc-600' },
};

export default function ManagerDashboard() {
  const { orders, engineers, getEngineer } = useManager();

  const urgent = orders.filter((o) => o.priority === 'urgent' && o.status !== 'completed');
  const completed = orders.filter((o) => o.status === 'completed');
  const inProgress = orders.filter((o) => o.status === 'in_progress');
  const unassigned = orders.filter((o) => !o.assignedEngineerId && o.status !== 'completed');
  const activeEngineers = engineers.filter((e) => e.status === 'active');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Дашборд</h2>
        <p className="text-zinc-400 text-sm mt-1">Сегодня, {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <Users size={16} /> Инженеры онлайн
          </div>
          <p className="text-3xl font-bold">{activeEngineers.length}</p>
          <p className="text-xs text-zinc-500 mt-1">из {engineers.length} всего</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <AlertTriangle size={16} /> Срочные заявки
          </div>
          <p className="text-3xl font-bold text-red-400">{urgent.length}</p>
          <p className="text-xs text-zinc-500 mt-1">требуют внимания</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <Clock size={16} /> В работе
          </div>
          <p className="text-3xl font-bold text-orange-400">{inProgress.length}</p>
          <p className="text-xs text-zinc-500 mt-1">активных заявок</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <CheckCircle size={16} /> Выполнено
          </div>
          <p className="text-3xl font-bold text-green-400">{completed.length}</p>
          <p className="text-xs text-zinc-500 mt-1">за сегодня</p>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Urgent orders */}
        <div className="bg-zinc-900 rounded-2xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            Срочные и неназначенные
          </h3>
          {[...urgent, ...unassigned.filter(o => o.priority !== 'urgent')].length === 0 ? (
            <p className="text-zinc-500 text-sm">Всё под контролем</p>
          ) : (
            <div className="space-y-2">
              {[...urgent, ...unassigned.filter(o => o.priority !== 'urgent')].map((order) => {
                const engineer = order.assignedEngineerId ? getEngineer(order.assignedEngineerId) : null;
                return (
                  <div key={order.id} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl">
                    <PriorityBadge priority={order.priority} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{order.equipment}</p>
                      <p className="text-xs text-zinc-400 truncate">{order.address}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {engineer ? (
                        <p className="text-xs text-zinc-300">{engineer.name.split(' ')[0]}</p>
                      ) : (
                        <p className="text-xs text-red-400">Не назначен</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Engineers status */}
        <div className="bg-zinc-900 rounded-2xl p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Users size={16} className="text-blue-400" />
            Статус инженеров
          </h3>
          <div className="space-y-3">
            {engineers.map((eng) => {
              const cfg = engineerStatusLabel[eng.status];
              const currentOrder = eng.currentOrderId
                ? orders.find((o) => o.id === eng.currentOrderId)
                : null;
              return (
                <div key={eng.id} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{eng.name}</p>
                    {currentOrder ? (
                      <p className="text-xs text-zinc-400 truncate">{currentOrder.equipment} — {currentOrder.address}</p>
                    ) : (
                      <p className="text-xs text-zinc-500">{cfg.label}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-zinc-400">{eng.completedToday}/{eng.totalToday}</p>
                    <StatusBadge status={eng.status === 'active' ? 'in_progress' : eng.status === 'idle' ? 'assigned' : 'completed'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
