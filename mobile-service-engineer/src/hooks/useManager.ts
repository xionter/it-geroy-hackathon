import { useContext } from 'react';
import { ManagerContext } from '../context/managerContextValue';

export function useManager() {
  const ctx = useContext(ManagerContext);
  if (!ctx) throw new Error('useManager must be used within ManagerProvider');
  return ctx;
}
