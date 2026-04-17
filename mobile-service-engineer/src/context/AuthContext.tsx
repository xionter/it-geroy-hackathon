import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { managerAccounts, type ManagerAccount } from '../mocks/managers';
import { workerAccounts, type WorkerAccount } from '../mocks/workers';
import { AuthContext } from './authContextValue';

const WORKER_STORAGE_KEY = 'servicepro_worker_id';
const MANAGER_STORAGE_KEY = 'servicepro_manager_id';

function getStoredWorker() {
  const workerId = localStorage.getItem(WORKER_STORAGE_KEY);
  return workerAccounts.find((worker) => worker.id === workerId) ?? null;
}

function getStoredManager() {
  const managerId = localStorage.getItem(MANAGER_STORAGE_KEY);
  return managerAccounts.find((manager) => manager.id === managerId) ?? null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [worker, setWorker] = useState<WorkerAccount | null>(getStoredWorker);
  const [manager, setManager] = useState<ManagerAccount | null>(getStoredManager);

  const loginWorker = useCallback((employeeNumber: string, pin: string) => {
    const normalizedNumber = employeeNumber.trim().toUpperCase();
    const account = workerAccounts.find(
      (item) => item.employeeNumber === normalizedNumber && item.pin === pin.trim()
    );

    if (!account) return false;

    localStorage.setItem(WORKER_STORAGE_KEY, account.id);
    setWorker(account);
    return true;
  }, []);

  const loginManager = useCallback((employeeNumber: string, pin: string) => {
    const normalizedNumber = employeeNumber.trim().toUpperCase();
    const account = managerAccounts.find(
      (item) => item.employeeNumber === normalizedNumber && item.pin === pin.trim()
    );

    if (!account) return false;

    localStorage.setItem(MANAGER_STORAGE_KEY, account.id);
    setManager(account);
    return true;
  }, []);

  const logoutWorker = useCallback(() => {
    localStorage.removeItem(WORKER_STORAGE_KEY);
    setWorker(null);
  }, []);

  const logoutManager = useCallback(() => {
    localStorage.removeItem(MANAGER_STORAGE_KEY);
    setManager(null);
  }, []);

  const logout = useCallback(() => {
    logoutWorker();
    logoutManager();
  }, [logoutWorker, logoutManager]);

  const value = useMemo(
    () => ({
      worker,
      manager,
      loginWorker,
      loginManager,
      logoutWorker,
      logoutManager,
      logout,
    }),
    [worker, manager, loginWorker, loginManager, logoutWorker, logoutManager, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
