import { createContext } from 'react';
import type { Order, UsedPart } from '../types';

export interface OrderContextType {
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

export const OrderContext = createContext<OrderContextType | null>(null);
