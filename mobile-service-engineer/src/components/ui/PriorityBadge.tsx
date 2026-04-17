import type { Priority } from '../../types';

const config: Record<Priority, { label: string; className: string }> = {
  urgent: { label: 'СРОЧНО', className: 'bg-red-500/20 text-red-400' },
  medium: { label: 'СРЕДНИЙ', className: 'bg-yellow-500/20 text-yellow-400' },
  planned: { label: 'ПЛАНОВО', className: 'bg-green-500/20 text-green-400' },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, className } = config[priority];
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${className}`}>
      {label}
    </span>
  );
}
