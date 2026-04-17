import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import { Package } from 'lucide-react';
import { mockParts } from '../../mocks/parts';

export default function PartsScreen() {
  return (
    <>
      <Header title="Мой склад" />
      <div className="px-4 space-y-4 pb-6">
        <p className="text-zinc-400 text-sm">Выданные запчасти на сегодня</p>

        <div className="space-y-2">
          {mockParts.map((part) => (
            <Card key={part.id} className="flex items-center gap-3">
              <div className="min-w-[44px] min-h-[44px] bg-orange-600/20 rounded-xl flex items-center justify-center">
                <Package size={20} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{part.name}</p>
                <p className="text-sm text-zinc-400">В наличии</p>
              </div>
              <span className="text-lg font-semibold">
                {part.quantity} <span className="text-sm text-zinc-400">{part.unit}</span>
              </span>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
