import { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { mockWarehouse } from '../../mocks/warehouse';
import { Package } from 'lucide-react';

export default function WarehousePage() {
  const { engineers } = useManager();
  const [warehouse] = useState(mockWarehouse);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Склад</h2>
      <p className="text-zinc-400 text-sm">Распределение запчастей по инженерам</p>

      <div className="bg-zinc-900 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="text-left p-4 font-medium">Запчасть</th>
              <th className="text-left p-4 font-medium">Всего</th>
              <th className="text-left p-4 font-medium">Выдано</th>
              <th className="text-left p-4 font-medium">Остаток</th>
              <th className="text-left p-4 font-medium">Кому выдано</th>
            </tr>
          </thead>
          <tbody>
            {warehouse.map((item) => {
              const issued = item.assignedTo.reduce((sum, a) => sum + a.quantity, 0);
              const remaining = item.totalQuantity - issued;

              return (
                <tr key={item.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-orange-400 flex-shrink-0" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300">{item.totalQuantity} {item.unit}</td>
                  <td className="p-4 text-orange-400">{issued} {item.unit}</td>
                  <td className="p-4">
                    <span className={remaining < 3 ? 'text-red-400 font-semibold' : 'text-green-400'}>
                      {remaining} {item.unit}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.assignedTo.length === 0 ? (
                      <span className="text-zinc-600">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {item.assignedTo.map((a) => {
                          const eng = engineers.find((e) => e.id === a.engineerId);
                          return (
                            <span
                              key={a.engineerId}
                              className="bg-zinc-700 text-xs px-2 py-0.5 rounded-lg"
                            >
                              {eng?.name.split(' ')[0]} ×{a.quantity}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
