import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import { Navigation, MapPin } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export default function MapScreen() {
  const { orders } = useOrders();
  const activeOrders = orders.filter((o) => o.status !== 'completed');

  const openRoute = (address: string) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://yandex.ru/maps/?text=${encoded}`, '_blank');
  };

  const openFullRoute = () => {
    // Build multi-stop route: rtext uses ~ as separator between points
    const points = activeOrders.map((o) => encodeURIComponent(o.address)).join('~');
    window.open(`https://yandex.ru/maps/?rtext=${points}&rtt=auto`, '_blank');
  };

  return (
    <>
      <Header title="Карта" />
      <div className="px-4 space-y-4 pb-6">
        {/* Map placeholder */}
        <div className="bg-zinc-900 rounded-2xl h-48 flex items-center justify-center overflow-hidden">
          <div className="text-center text-zinc-500">
            <MapPin size={40} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Карта маршрута</p>
            <p className="text-xs text-zinc-600 mt-1">{activeOrders.length} точек</p>
          </div>
        </div>

        {/* Build full route */}
        {activeOrders.length > 1 && (
          <button
            onClick={openFullRoute}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-blue-600 active:bg-blue-700 font-semibold min-h-[48px]"
          >
            <Navigation size={20} />
            Маршрут по всем точкам
          </button>
        )}

        {/* Points list */}
        <div className="space-y-3">
          {activeOrders.map((order, idx) => (
            <Card
              key={order.id}
              onClick={() => openRoute(order.address)}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{order.equipment}</p>
                <p className="text-sm text-zinc-400 truncate">{order.address}</p>
              </div>
              <Navigation size={18} className="text-zinc-500 flex-shrink-0" />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
