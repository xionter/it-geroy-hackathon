import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { workerAccounts, type WorkerAccount } from '../mocks/workers';
import { AuthContext } from './authContextValue';

const STORAGE_KEY = 'servicepro_worker_id';

function getStoredWorker() {
  const workerId = localStorage.getItem(STORAGE_KEY);
  return workerAccounts.find((worker) => worker.id === workerId) ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [worker, setWorker] = useState<WorkerAccount | null>(getStoredWorker);

  const loginWorker = useCallback((employeeNumber: string, pin: string) => {
    const normalizedNumber = employeeNumber.trim().toUpperCase();
    const account = workerAccounts.find(
      (item) => item.employeeNumber === normalizedNumber && item.pin === pin.trim()
    );

    if (!account) return false;

    localStorage.setItem(STORAGE_KEY, account.id);
    setWorker(account);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setWorker(null);
  }, []);

  const value = useMemo(
    () => ({ worker, loginWorker, logout }),
    [worker, loginWorker, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
