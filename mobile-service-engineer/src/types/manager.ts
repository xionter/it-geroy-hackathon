import type { Priority, OrderStatus } from './index';

export type EngineerStatus = 'active' | 'idle' | 'offline';

export interface Engineer {
  id: string;
  name: string;
  phone: string;
  status: EngineerStatus;
  currentOrderId: string | null;
  completedToday: number;
  totalToday: number;
  location: string | null;
}

export interface ManagerOrder {
  id: string;
  address: string;
  building: string;
  clientName: string;
  clientPhone: string;
  equipment: string;
  description: string;
  priority: Priority;
  status: OrderStatus;
  scheduledTime: string;
  assignedEngineerId: string | null;
  createdAt: string;
}

export interface WarehouseItem {
  id: string;
  name: string;
  totalQuantity: number;
  unit: string;
  assignedTo: { engineerId: string; quantity: number }[];
}
