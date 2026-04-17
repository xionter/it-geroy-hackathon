import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Engineer, ManagerOrder } from '../types/manager';
import { mockEngineers } from '../mocks/engineers';
import { mockManagerOrders } from '../mocks/managerOrders';
import type { OrderStatus, Priority } from '../types';

interface ManagerContextType {
  engineers: Engineer[];
  orders: ManagerOrder[];
  assignOrder: (orderId: string, engineerId: string | null) => void;
  setPriority: (orderId: string, priority: Priority) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  getEngineer: (id: string) => Engineer | undefined;
}

const ManagerContext = createContext<ManagerContextType | null>(null);

export function ManagerProvider({ children }: { children: ReactNode }) {
  const [engineers] = useState<Engineer[]>(mockEngineers);
  const [orders, setOrders] = useState<ManagerOrder[]>(mockManagerOrders);

  const assignOrder = useCallback((orderId: string, engineerId: string | null) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, assignedEngineerId: engineerId } : o))
    );
  }, []);

  const setPriority = useCallback((orderId: string, priority: Priority) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, priority } : o))
    );
  }, []);

  const setOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, []);

  const getEngineer = useCallback(
    (id: string) => engineers.find((e) => e.id === id),
    [engineers]
  );

  return (
    <ManagerContext.Provider value={{ engineers, orders, assignOrder, setPriority, setOrderStatus, getEngineer }}>
      {children}
    </ManagerContext.Provider>
  );
}

export function useManager() {
  const ctx = useContext(ManagerContext);
  if (!ctx) throw new Error('useManager must be used within ManagerProvider');
  return ctx;
}
