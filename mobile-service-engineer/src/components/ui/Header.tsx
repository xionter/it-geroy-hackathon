import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  backTo?: string;
}

export default function Header({ title, showBack = false, backTo }: HeaderProps) {
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
      {showBack && (
        <button
          onClick={() => (backTo ? nav(backTo) : nav(-1))}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 rounded-xl active:bg-zinc-800"
        >
          <ChevronLeft size={28} />
        </button>
      )}
      <h1 className="text-xl font-bold truncate">{title}</h1>
    </header>
  );
}
