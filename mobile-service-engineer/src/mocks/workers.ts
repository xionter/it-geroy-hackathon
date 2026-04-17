export interface WorkerAccount {
  id: string;
  name: string;
  position: string;
  employeeNumber: string;
  pin: string;
}

export const workerAccounts: WorkerAccount[] = [
  {
    id: 'e1',
    name: 'Алексей Петров',
    position: 'Сервисный инженер',
    employeeNumber: 'ENG-001',
    pin: '1234',
  },
  {
    id: 'e2',
    name: 'Дмитрий Волков',
    position: 'Сервисный инженер',
    employeeNumber: 'ENG-002',
    pin: '2345',
  },
  {
    id: 'e3',
    name: 'Сергей Новиков',
    position: 'Сервисный инженер',
    employeeNumber: 'ENG-003',
    pin: '3456',
  },
];
