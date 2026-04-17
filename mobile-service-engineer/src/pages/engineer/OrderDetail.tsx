import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Wrench, Navigation, Play } from 'lucide-react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import PriorityBadge from '../../components/ui/PriorityBadge';
import StatusBadge from '../../components/ui/StatusBadge';
import Card from '../../components/ui/Card';
import { useOrders } from '../../hooks/useOrders';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { getOrder, startWork } = useOrders();

  const order = getOrder(id!);
  if (!order) {
    return (
      <>
        <Header title="Заявка" showBack />
        <p className="text-center text-zinc-500 py-12">Заявка не найдена</p>
      </>
    );
  }

  const openMap = () => {
    const encoded = encodeURIComponent(order.address);
    window.open(`https://yandex.ru/maps/?text=${encoded}`, '_blank');
  };

  const callClient = () => {
    window.location.href = `tel:${order.clientPhone.replace(/\D/g, '')}`;
  };

  const handleStart = () => {
    startWork(order.id);
    nav(`/engineer/order/${order.id}/work`);
  };

  return (
    <>
      <Header title="Заявка" showBack />
      <div className="px-4 space-y-4 pb-6">
        {/* Priority & Status */}
        <div className="flex items-center gap-2">
          <PriorityBadge priority={order.priority} />
          <StatusBadge status={order.status} />
          <span className="text-zinc-500 text-sm ml-auto">{order.scheduledTime}</span>
        </div>

        {/* Equipment */}
        <div>
          <h2 className="text-2xl font-bold">{order.equipment}</h2>
          <p className="text-zinc-400 mt-1">{order.description}</p>
        </div>

        {/* Address */}
        <Card onClick={openMap} className="flex items-center gap-3">
          <div className="min-w-[44px] min-h-[44px] bg-blue-600/20 rounded-xl flex items-center justify-center">
            <MapPin size={22} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{order.address}</p>
            <p className="text-sm text-zinc-400">{order.building}</p>
          </div>
          <Navigation size={20} className="text-zinc-500" />
        </Card>

        {/* Client */}
        <Card onClick={callClient} className="flex items-center gap-3">
          <div className="min-w-[44px] min-h-[44px] bg-green-600/20 rounded-xl flex items-center justify-center">
            <User size={22} className="text-green-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{order.clientName}</p>
            <p className="text-sm text-zinc-400">{order.clientPhone}</p>
          </div>
          <Phone size={20} className="text-zinc-500" />
        </Card>

        {/* Equipment info */}
        <Card className="flex items-center gap-3">
          <div className="min-w-[44px] min-h-[44px] bg-orange-600/20 rounded-xl flex items-center justify-center">
            <Wrench size={22} className="text-orange-400" />
          </div>
          <div>
            <p className="font-medium">{order.equipment}</p>
            <p className="text-sm text-zinc-400">Оборудование</p>
          </div>
        </Card>

        {/* Actions */}
        <div className="pt-2 space-y-3">
          <Button onClick={openMap} variant="secondary" icon={<Navigation size={20} />}>
            Построить маршрут
          </Button>

          {order.status === 'assigned' && (
            <Button onClick={handleStart} icon={<Play size={20} />}>
              Начать работу
            </Button>
          )}

          {order.status === 'in_progress' && (
            <Button onClick={() => nav(`/engineer/order/${order.id}/work`)}>
              Продолжить работу
            </Button>
          )}

          {order.status === 'completed' && (
            <Card className="text-center">
              <p className="text-green-400 font-semibold">Заявка выполнена</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
