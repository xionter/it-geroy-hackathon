import type { Engineer } from '../types/manager';

export const mockEngineers: Engineer[] = [
  {
    id: 'e1',
    name: 'Алексей Петров',
    phone: '+7 (900) 111-22-33',
    status: 'active',
    currentOrderId: '1',
    completedToday: 2,
    totalToday: 5,
    location: 'ул. Ленина, 12',
  },
  {
    id: 'e2',
    name: 'Дмитрий Волков',
    phone: '+7 (900) 222-33-44',
    status: 'active',
    currentOrderId: '4',
    completedToday: 1,
    totalToday: 4,
    location: 'пр. Мира, 45',
  },
  {
    id: 'e3',
    name: 'Сергей Новиков',
    phone: '+7 (900) 333-44-55',
    status: 'idle',
    currentOrderId: null,
    completedToday: 3,
    totalToday: 3,
    location: 'Офис',
  },
  {
    id: 'e4',
    name: 'Иван Соколов',
    phone: '+7 (900) 444-55-66',
    status: 'offline',
    currentOrderId: null,
    completedToday: 0,
    totalToday: 0,
    location: null,
  },
];
