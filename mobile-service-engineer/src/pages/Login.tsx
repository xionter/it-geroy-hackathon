import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, UserRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const { worker, manager, loginWorker, loginManager, logoutWorker, logoutManager } = useAuth();
  const defaultRole = typeof location.state === 'object'
    && location.state
    && 'from' in location.state
    && String(location.state.from).startsWith('/manager')
    ? 'manager'
    : 'worker';
  const [activeRole, setActiveRole] = useState<'worker' | 'manager'>(defaultRole);
  const [employeeNumber, setEmployeeNumber] = useState('ENG-001');
  const [pin, setPin] = useState('1234');
  const [managerNumber, setManagerNumber] = useState('MGR-001');
  const [managerPin, setManagerPin] = useState('4321');
  const [error, setError] = useState('');

  const from = typeof location.state === 'object' && location.state && 'from' in location.state
    ? String(location.state.from)
    : '/engineer';

  const handleWorkerLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = loginWorker(employeeNumber, pin);

    if (!ok) {
      setError('Неверный табельный номер или PIN');
      return;
    }

    setError('');
    nav(from.startsWith('/engineer') ? from : '/engineer', { replace: true });
  };

  const handleManagerLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = loginManager(managerNumber, managerPin);

    if (!ok) {
      setError('Неверный табельный номер или PIN');
      return;
    }

    setError('');
    nav(from.startsWith('/manager') ? from : '/manager', { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">СервисПро</h1>
          <p className="text-zinc-400 mt-2">Платформа выездного обслуживания</p>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-zinc-900 rounded-2xl p-1">
          <button
            onClick={() => {
              setActiveRole('worker');
              setError('');
            }}
            className={`p-3 rounded-xl text-sm font-semibold ${
              activeRole === 'worker' ? 'bg-blue-600 text-white' : 'text-zinc-400'
            }`}
          >
            Инженер
          </button>
          <button
            onClick={() => {
              setActiveRole('manager');
              setError('');
            }}
            className={`p-3 rounded-xl text-sm font-semibold ${
              activeRole === 'manager' ? 'bg-blue-600 text-white' : 'text-zinc-400'
            }`}
          >
            Начальник смены
          </button>
        </div>

        {activeRole === 'worker' && worker ? (
          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-sm text-zinc-400">Текущая смена</p>
              <p className="text-lg font-semibold">{worker.name}</p>
              <p className="text-sm text-zinc-500">{worker.position}</p>
            </div>
            <button
              onClick={() => nav('/engineer')}
              className="w-full bg-blue-600 active:bg-blue-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Продолжить работу
            </button>
            <button
              onClick={logoutWorker}
              className="w-full bg-zinc-800 active:bg-zinc-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Выйти из смены
            </button>
          </div>
        ) : activeRole === 'worker' ? (
          <form onSubmit={handleWorkerLogin} className="bg-zinc-900 rounded-2xl p-4 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Вход работника</h2>
              <p className="text-sm text-zinc-400 mt-1">Введите табельный номер и PIN смены</p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm text-zinc-400">Табельный номер</span>
              <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-4">
                <UserRound size={20} className="text-zinc-500" />
                <input
                  value={employeeNumber}
                  onChange={(event) => setEmployeeNumber(event.target.value)}
                  className="w-full bg-transparent py-4 outline-none uppercase placeholder-zinc-600"
                  placeholder="ENG-001"
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-zinc-400">PIN</span>
              <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-4">
                <Lock size={20} className="text-zinc-500" />
                <input
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                  type="password"
                  inputMode="numeric"
                  className="w-full bg-transparent py-4 outline-none placeholder-zinc-600"
                  placeholder="1234"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 active:bg-blue-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Войти как инженер
            </button>

            <p className="text-xs text-zinc-500">
              Демо-доступ: ENG-001 / 1234
            </p>
          </form>
        ) : manager ? (
          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-sm text-zinc-400">Управление сменой</p>
              <p className="text-lg font-semibold">{manager.name}</p>
              <p className="text-sm text-zinc-500">{manager.position}</p>
            </div>
            <button
              onClick={() => nav('/manager')}
              className="w-full bg-blue-600 active:bg-blue-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Открыть дашборд
            </button>
            <button
              onClick={logoutManager}
              className="w-full bg-zinc-800 active:bg-zinc-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Выйти из смены
            </button>
          </div>
        ) : (
          <form onSubmit={handleManagerLogin} className="bg-zinc-900 rounded-2xl p-4 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Вход начальника смены</h2>
              <p className="text-sm text-zinc-400 mt-1">Введите табельный номер и PIN смены</p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm text-zinc-400">Табельный номер</span>
              <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-4">
                <UserRound size={20} className="text-zinc-500" />
                <input
                  value={managerNumber}
                  onChange={(event) => setManagerNumber(event.target.value)}
                  className="w-full bg-transparent py-4 outline-none uppercase placeholder-zinc-600"
                  placeholder="MGR-001"
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm text-zinc-400">PIN</span>
              <div className="flex items-center gap-3 bg-zinc-800 rounded-2xl px-4">
                <Lock size={20} className="text-zinc-500" />
                <input
                  value={managerPin}
                  onChange={(event) => setManagerPin(event.target.value)}
                  type="password"
                  inputMode="numeric"
                  className="w-full bg-transparent py-4 outline-none placeholder-zinc-600"
                  placeholder="4321"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 active:bg-blue-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Войти как начальник смены
            </button>

            <p className="text-xs text-zinc-500">
              Демо-доступ: MGR-001 / 4321
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
