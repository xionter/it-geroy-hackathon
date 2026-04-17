import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Check, ChevronRight } from 'lucide-react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import { useOrders } from '../../context/OrderContext';
import { mockParts } from '../../mocks/parts';

const typicalWorks = [
  'Диагностика',
  'Замена фильтров',
  'Замена подшипников',
  'Замена ремня',
  'Заправка фреона',
  'Замена платы управления',
  'Чистка контактов',
  'Смазка механизмов',
  'Калибровка датчиков',
  'Проверка электрики',
];

export default function WorkScreen() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { getOrder, addPhotoBefore, addPhotoAfter, toggleWork, addUsedPart, removeUsedPart } = useOrders();
  const [partsModal, setPartsModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  const order = getOrder(id!);
  if (!order) {
    return (
      <>
        <Header title="Работа" showBack />
        <p className="text-center text-zinc-500 py-12">Заявка не найдена</p>
      </>
    );
  }

  const handlePhoto = (type: 'before' | 'after') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        if (type === 'before') addPhotoBefore(order.id, dataUrl);
        else addPhotoAfter(order.id, dataUrl);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <>
      <Header title="Выполнение работ" showBack />
      <div className="px-4 space-y-6 pb-6">
        {/* Photo Before */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Фото ДО ремонта</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {order.photosBefore.map((p, i) => (
              <img key={i} src={p} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
            ))}
            <button
              onClick={() => handlePhoto('before')}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center flex-shrink-0 active:bg-zinc-800"
            >
              <Camera size={28} className="text-zinc-500" />
            </button>
          </div>
        </section>

        {/* Works checklist */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Выполненные работы</h3>
          <div className="space-y-2">
            {typicalWorks.map((work) => {
              const checked = order.completedWorks.includes(work);
              return (
                <button
                  key={work}
                  onClick={() => toggleWork(order.id, work)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl min-h-[48px] text-left transition-colors ${
                    checked ? 'bg-blue-600/20' : 'bg-zinc-900'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      checked ? 'bg-blue-600' : 'bg-zinc-700'
                    }`}
                  >
                    {checked && <Check size={16} />}
                  </div>
                  <span className={checked ? 'text-white' : 'text-zinc-400'}>{work}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Used parts */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Использованные запчасти</h3>
            <button
              onClick={() => setPartsModal(true)}
              className="text-blue-400 text-sm font-medium min-h-[44px] flex items-center"
            >
              + Добавить
            </button>
          </div>
          {order.usedParts.length === 0 ? (
            <p className="text-zinc-500 text-sm">Не добавлено</p>
          ) : (
            <div className="space-y-2">
              {order.usedParts.map((p) => (
                <Card key={p.partId} className="flex items-center justify-between">
                  <span>{p.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400">×{p.quantity}</span>
                    <button
                      onClick={() => removeUsedPart(order.id, p.partId)}
                      className="text-red-400 text-xl min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Photo After */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Фото ПОСЛЕ ремонта</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {order.photosAfter.map((p, i) => (
              <img key={i} src={p} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
            ))}
            <button
              onClick={() => handlePhoto('after')}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center flex-shrink-0 active:bg-zinc-800"
            >
              <Camera size={28} className="text-zinc-500" />
            </button>
          </div>
        </section>

        {/* Validation error */}
        {validationError && (
          <p className="text-red-400 text-sm text-center">{validationError}</p>
        )}

        {/* Next */}
        <Button
          onClick={() => {
            if (order.completedWorks.length === 0) {
              setValidationError('Отметьте хотя бы одну выполненную работу');
              return;
            }
            setValidationError('');
            nav(`/engineer/order/${order.id}/sign`);
          }}
          icon={<ChevronRight size={20} />}
        >
          Далее → Подпись клиента
        </Button>
      </div>

      {/* Parts modal */}
      <Modal open={partsModal} onClose={() => setPartsModal(false)} title="Выбор запчасти">
        <div className="space-y-2">
          {mockParts.map((part) => (
            <button
              key={part.id}
              onClick={() => {
                addUsedPart(order.id, { partId: part.id, name: part.name, quantity: 1 });
                setPartsModal(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-800 active:bg-zinc-700 min-h-[48px]"
            >
              <span>{part.name}</span>
              <span className="text-zinc-400 text-sm">
                {part.quantity} {part.unit}
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
