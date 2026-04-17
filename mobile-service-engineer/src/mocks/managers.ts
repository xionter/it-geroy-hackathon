export interface ManagerAccount {
  id: string;
  name: string;
  position: string;
  employeeNumber: string;
  pin: string;
}

export const managerAccounts: ManagerAccount[] = [
  {
    id: 'mng-1',
    name: 'Марина Орлова',
    position: 'Начальник смены',
    employeeNumber: 'MGR-001',
    pin: '4321',
  },
  {
    id: 'mng-2',
    name: 'Олег Антонов',
    position: 'Старший диспетчер',
    employeeNumber: 'MGR-002',
    pin: '5432',
  },
];
