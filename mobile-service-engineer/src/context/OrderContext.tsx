import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Order, UsedPart } from '../types';
import { mockOrders } from '../mocks/orders';

interface OrderContextType {
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  startWork: (id: string) => void;
  completeOrder: (id: string) => void;
  addPhotoBefore: (id: string, photo: string) => void;
  addPhotoAfter: (id: string, photo: string) => void;
  setSignature: (id: string, signature: string) => void;
  addUsedPart: (id: string, part: UsedPart) => void;
  removeUsedPart: (id: string, partId: string) => void;
  toggleWork: (id: string, work: string) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const startWork = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'in_progress' as const } : o))
    );
  }, []);

  const completeOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'completed' as const } : o))
    );
  }, []);

  const addPhotoBefore = useCallback((id: string, photo: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, photosBefore: [...o.photosBefore, photo] } : o
      )
    );
  }, []);

  const addPhotoAfter = useCallback((id: string, photo: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, photosAfter: [...o.photosAfter, photo] } : o
      )
    );
  }, []);

  const setSignature = useCallback((id: string, signature: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, signature } : o))
    );
  }, []);

  const addUsedPart = useCallback((id: string, part: UsedPart) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const existing = o.usedParts.find((p) => p.partId === part.partId);
        if (existing) {
          return {
            ...o,
            usedParts: o.usedParts.map((p) =>
              p.partId === part.partId ? { ...p, quantity: p.quantity + 1 } : p
            ),
          };
        }
        return { ...o, usedParts: [...o.usedParts, part] };
      })
    );
  }, []);

  const removeUsedPart = useCallback((id: string, partId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, usedParts: o.usedParts.filter((p) => p.partId !== partId) }
          : o
      )
    );
  }, []);

  const toggleWork = useCallback((id: string, work: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const has = o.completedWorks.includes(work);
        return {
          ...o,
          completedWorks: has
            ? o.completedWorks.filter((w) => w !== work)
            : [...o.completedWorks, work],
        };
      })
    );
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrder,
        startWork,
        completeOrder,
        addPhotoBefore,
        addPhotoAfter,
        setSignature,
        addUsedPart,
        removeUsedPart,
        toggleWork,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
