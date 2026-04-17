import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../../components/ui/Header';
import SignaturePad from '../../components/signature/SignaturePad';
import Button from '../../components/ui/Button';
import { useOrders } from '../../context/OrderContext';

export default function SignScreen() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { getOrder, setSignature, completeOrder } = useOrders();

  const order = getOrder(id!);
  if (!order) {
    return (
      <>
        <Header title="Подпись" showBack />
        <p className="text-center text-zinc-500 py-12">Заявка не найдена</p>
      </>
    );
  }

  const handleSave = (dataUrl: string) => {
    setSignature(order.id, dataUrl);
  };

  const handleComplete = () => {
    completeOrder(order.id);
    nav('/engineer');
  };

  return (
    <>
      <Header title="Подпись клиента" showBack />
      <div className="px-4 space-y-6 pb-6">
        <div>
          <p className="text-zinc-400">
            Попросите клиента подписать акт выполненных работ
          </p>
        </div>

        {order.signature ? (
          <div className="space-y-4">
            <div className="border-2 border-green-600/30 rounded-2xl overflow-hidden">
              <img src={order.signature} className="w-full h-48 object-contain bg-zinc-900" />
            </div>
            <p className="text-center text-green-400 text-sm font-medium">
              Подпись получена
            </p>
          </div>
        ) : (
          <SignaturePad onSave={handleSave} />
        )}

        {/* Summary */}
        <div className="bg-zinc-900 rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold">Итог заявки</h3>
          <p className="text-sm text-zinc-400">
            Работы: {order.completedWorks.length > 0 ? order.completedWorks.join(', ') : 'Не указаны'}
          </p>
          <p className="text-sm text-zinc-400">
            Запчасти: {order.usedParts.length > 0 ? order.usedParts.map((p) => p.name).join(', ') : 'Не использованы'}
          </p>
          <p className="text-sm text-zinc-400">
            Фото до: {order.photosBefore.length} · Фото после: {order.photosAfter.length}
          </p>
        </div>

        {order.signature && (
          <Button onClick={handleComplete} icon={<CheckCircle size={20} />}>
            Завершить заявку
          </Button>
        )}
      </div>
    </>
  );
}
