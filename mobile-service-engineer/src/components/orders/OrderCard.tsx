import { useNavigate } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import type { Order } from '../../types';
import Card from '../ui/Card';
import PriorityBadge from '../ui/PriorityBadge';
import StatusBadge from '../ui/StatusBadge';

export default function OrderCard({ order }: { order: Order }) {
  const nav = useNavigate();

  return (
    <Card onClick={() => nav(`/engineer/order/${order.id}`)}>
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={order.priority} />
        <StatusBadge status={order.status} />
      </div>
      <h3 className="text-lg font-semibold mt-1">{order.equipment}</h3>
      <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{order.description}</p>
      <div className="flex items-center gap-4 mt-3 text-zinc-500 text-sm">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {order.address}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {order.scheduledTime}
        </span>
      </div>
    </Card>
  );
}
