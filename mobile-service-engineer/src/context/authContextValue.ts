import { createContext } from 'react';
import type { WorkerAccount } from '../mocks/workers';

export interface AuthContextType {
  worker: WorkerAccount | null;
  loginWorker: (employeeNumber: string, pin: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
