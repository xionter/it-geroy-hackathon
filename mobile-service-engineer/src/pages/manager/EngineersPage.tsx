import { useManager } from '../../context/ManagerContext';
import { Phone, MapPin, Briefcase, CheckCircle } from 'lucide-react';

const statusConfig = {
  active: { label: 'На выезде', color: 'bg-green-500', text: 'text-green-400' },
  idle: { label: 'Свободен', color: 'bg-yellow-500', text: 'text-yellow-400' },
  offline: { label: 'Офлайн', color: 'bg-zinc-600', text: 'text-zinc-400' },
};

export default function EngineersPage() {
  const { engineers, orders } = useManager();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Инженеры</h2>

      <div className="grid lg:grid-cols-2 gap-4">
        {engineers.map((eng) => {
          const cfg = statusConfig[eng.status];
          const currentOrder = eng.currentOrderId
            ? orders.find((o) => o.id === eng.currentOrderId)
            : null;
          const myOrders = orders.filter((o) => o.assignedEngineerId === eng.id);
          const progress = eng.totalToday > 0 ? (eng.completedToday / eng.totalToday) * 100 : 0;

          return (
            <div key={eng.id} className="bg-zinc-900 rounded-2xl p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 font-bold text-lg flex-shrink-0">
                  {eng.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{eng.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${cfg.color}`} />
                    <span className={`text-xs ${cfg.text}`}>{cfg.label}</span>
                  </div>
                </div>
                <a
                  href={`tel:${eng.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <Phone size={14} />
                  {eng.phone}
                </a>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Выполнено заявок</span>
                  <span>{eng.completedToday} / {eng.totalToday}</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Current task */}
              {currentOrder && (
                <div className="bg-zinc-800 rounded-xl p-3 flex items-start gap-2">
                  <Briefcase size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-orange-400 font-medium">Сейчас работает</p>
                    <p className="text-sm mt-0.5">{currentOrder.equipment}</p>
                    <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
                      <MapPin size={11} /> {currentOrder.address}
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              {eng.location && (
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <MapPin size={12} /> {eng.location}
                </p>
              )}

              {/* Orders list */}
              {myOrders.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs text-zinc-500 font-medium mb-2">Заявки на день</p>
                  {myOrders.map((o) => (
                    <div key={o.id} className="flex items-center gap-2 text-xs">
                      <CheckCircle
                        size={14}
                        className={o.status === 'completed' ? 'text-green-400' : 'text-zinc-600'}
                      />
                      <span className={o.status === 'completed' ? 'text-zinc-400 line-through' : 'text-zinc-300'}>
                        {o.equipment} — {o.address}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
