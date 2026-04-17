import { createContext } from 'react';
import type { OrderStatus, Priority } from '../types';
import type { Engineer, ManagerOrder } from '../types/manager';

export interface ManagerContextType {
  engineers: Engineer[];
  orders: ManagerOrder[];
  assignOrder: (orderId: string, engineerId: string | null) => void;
  assignOrders: (orderIds: string[], engineerId: string) => void;
  setPriority: (orderId: string, priority: Priority) => void;
  setOrderStatus: (orderId: string, status: OrderStatus) => void;
  getEngineer: (id: string) => Engineer | undefined;
}

export const ManagerContext = createContext<ManagerContextType | null>(null);
