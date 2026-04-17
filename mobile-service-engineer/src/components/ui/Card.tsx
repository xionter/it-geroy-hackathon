import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-zinc-900 p-4 rounded-2xl ${onClick ? 'active:bg-zinc-800 cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
