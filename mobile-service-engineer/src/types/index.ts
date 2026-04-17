export type Priority = 'urgent' | 'medium' | 'planned';
export type OrderStatus = 'assigned' | 'in_progress' | 'completed';

export interface Order {
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
  photosBefore: string[];
  photosAfter: string[];
  signature: string | null;
  usedParts: UsedPart[];
  completedWorks: string[];
}

export interface Part {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface UsedPart {
  partId: string;
  name: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  type: 'text' | 'photo' | 'voice';
  content: string;
  timestamp: string;
  fromMe: boolean;
}
