import { createContext } from 'react';
import type { ManagerAccount } from '../mocks/managers';
import type { WorkerAccount } from '../mocks/workers';

export interface AuthContextType {
  worker: WorkerAccount | null;
  manager: ManagerAccount | null;
  loginWorker: (employeeNumber: string, pin: string) => boolean;
  loginManager: (employeeNumber: string, pin: string) => boolean;
  logoutWorker: () => void;
  logoutManager: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
