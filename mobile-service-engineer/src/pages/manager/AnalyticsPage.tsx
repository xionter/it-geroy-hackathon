import { useManager } from '../../context/ManagerContext';
import { TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AnalyticsPage() {
  const { orders, engineers } = useManager();

  const completed = orders.filter((o) => o.status === 'completed');
  const urgent = orders.filter((o) => o.priority === 'urgent');
  const urgentCompleted = urgent.filter((o) => o.status === 'completed');

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Аналитика смены</h2>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <CheckCircle size={16} /> Выполнено
          </div>
          <p className="text-3xl font-bold text-green-400">{completed.length}</p>
          <p className="text-xs text-zinc-500 mt-1">из {orders.length} заявок</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <AlertTriangle size={16} /> Срочных закрыто
          </div>
          <p className="text-3xl font-bold text-orange-400">{urgentCompleted.length}/{urgent.length}</p>
          <p className="text-xs text-zinc-500 mt-1">срочных заявок</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <Clock size={16} /> Ср. нагрузка
          </div>
          <p className="text-3xl font-bold">
            {(orders.length / Math.max(engineers.filter(e => e.status !== 'offline').length, 1)).toFixed(1)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">заявок/инженер</p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
            <TrendingUp size={16} /> Эффективность
          </div>
          <p className="text-3xl font-bold text-blue-400">
            {orders.length > 0 ? Math.round((completed.length / orders.length) * 100) : 0}%
          </p>
          <p className="text-xs text-zinc-500 mt-1">закрыто за день</p>
        </div>
      </div>

      {/* Per-engineer stats */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <h3 className="font-semibold">Эффективность инженеров</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="text-left p-4 font-medium">Инженер</th>
              <th className="text-left p-4 font-medium">Назначено</th>
              <th className="text-left p-4 font-medium">Выполнено</th>
              <th className="text-left p-4 font-medium">Прогресс</th>
            </tr>
          </thead>
          <tbody>
            {engineers.map((eng) => {
              const myOrders = orders.filter((o) => o.assignedEngineerId === eng.id);
              const myCompleted = myOrders.filter((o) => o.status === 'completed');
              const pct = myOrders.length > 0 ? Math.round((myCompleted.length / myOrders.length) * 100) : 0;

              return (
                <tr key={eng.id} className="border-b border-zinc-800 last:border-0">
                  <td className="p-4 font-medium">{eng.name}</td>
                  <td className="p-4 text-zinc-300">{myOrders.length}</td>
                  <td className="p-4 text-green-400">{myCompleted.length}</td>
                  <td className="p-4 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 w-8 text-right">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Orders by priority */}
      <div className="grid lg:grid-cols-3 gap-4">
        {(['urgent', 'medium', 'planned'] as const).map((p) => {
          const pOrders = orders.filter((o) => o.priority === p);
          const pDone = pOrders.filter((o) => o.status === 'completed');
          const labels = { urgent: 'Срочные', medium: 'Средние', planned: 'Плановые' };
          const colors = { urgent: 'text-red-400', medium: 'text-yellow-400', planned: 'text-green-400' };

          return (
            <div key={p} className="bg-zinc-900 rounded-2xl p-4">
              <p className={`font-semibold ${colors[p]}`}>{labels[p]}</p>
              <p className="text-3xl font-bold mt-2">{pDone.length}<span className="text-zinc-500 text-lg">/{pOrders.length}</span></p>
              <p className="text-xs text-zinc-500 mt-1">выполнено</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
