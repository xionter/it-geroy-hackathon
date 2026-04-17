import type { OrderStatus } from '../../types';

const config: Record<OrderStatus, { label: string; className: string }> = {
  assigned: { label: 'К выполнению', className: 'bg-blue-500/20 text-blue-400' },
  in_progress: { label: 'В работе', className: 'bg-orange-500/20 text-orange-400' },
  completed: { label: 'Выполнено', className: 'bg-green-500/20 text-green-400' },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = config[status];
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${className}`}>
      {label}
    </span>
  );
}
