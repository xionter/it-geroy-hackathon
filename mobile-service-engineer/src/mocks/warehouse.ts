import type { WarehouseItem } from '../types/manager';

export const mockWarehouse: WarehouseItem[] = [
  {
    id: 'w1',
    name: 'Фильтр воздушный HEPA',
    totalQuantity: 20,
    unit: 'шт',
    assignedTo: [
      { engineerId: 'e1', quantity: 4 },
      { engineerId: 'e2', quantity: 3 },
    ],
  },
  {
    id: 'w2',
    name: 'Ремень привода AN-32',
    totalQuantity: 10,
    unit: 'шт',
    assignedTo: [
      { engineerId: 'e1', quantity: 2 },
    ],
  },
  {
    id: 'w3',
    name: 'Фреон R-410A',
    totalQuantity: 8,
    unit: 'баллон',
    assignedTo: [
      { engineerId: 'e2', quantity: 2 },
      { engineerId: 'e3', quantity: 1 },
    ],
  },
  {
    id: 'w4',
    name: 'Подшипник SKF 6204',
    totalQuantity: 30,
    unit: 'шт',
    assignedTo: [
      { engineerId: 'e1', quantity: 6 },
      { engineerId: 'e2', quantity: 4 },
    ],
  },
  {
    id: 'w5',
    name: 'Контактор LC1D09',
    totalQuantity: 15,
    unit: 'шт',
    assignedTo: [],
  },
  {
    id: 'w6',
    name: 'Плата управления PCB-V3',
    totalQuantity: 3,
    unit: 'шт',
    assignedTo: [
      { engineerId: 'e1', quantity: 1 },
    ],
  },
];
