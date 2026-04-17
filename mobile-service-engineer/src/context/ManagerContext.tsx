import { useState, useCallback, type ReactNode } from 'react';
import type { Engineer, ManagerOrder } from '../types/manager';
import { mockEngineers } from '../mocks/engineers';
import { mockManagerOrders } from '../mocks/managerOrders';
import type { OrderStatus, Priority } from '../types';
import { ManagerContext } from './managerContextValue';

export function ManagerProvider({ children }: { children: ReactNode }) {
  const [engineers] = useState<Engineer[]>(mockEngineers);
  const [orders, setOrders] = useState<ManagerOrder[]>(mockManagerOrders);

  const assignOrder = useCallback((orderId: string, engineerId: string | null) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, assignedEngineerId: engineerId } : o))
    );
  }, []);

  const assignOrders = useCallback((orderIds: string[], engineerId: string) => {
    const selectedIds = new Set(orderIds);
    setOrders((prev) =>
      prev.map((o) => (selectedIds.has(o.id) ? { ...o, assignedEngineerId: engineerId } : o))
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
    <ManagerContext.Provider value={{ engineers, orders, assignOrder, assignOrders, setPriority, setOrderStatus, getEngineer }}>
      {children}
    </ManagerContext.Provider>
  );
}
