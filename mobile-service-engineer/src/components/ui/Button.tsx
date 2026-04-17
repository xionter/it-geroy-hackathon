import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

const variants = {
  primary: 'bg-blue-600 active:bg-blue-700 text-white',
  secondary: 'bg-zinc-800 active:bg-zinc-700 text-white',
  danger: 'bg-red-600 active:bg-red-700 text-white',
  ghost: 'bg-transparent active:bg-zinc-800 text-zinc-300',
};

const sizes = {
  md: 'p-3 text-base',
  lg: 'p-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'lg',
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-2xl font-semibold flex items-center justify-center gap-2 min-h-[48px] transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
