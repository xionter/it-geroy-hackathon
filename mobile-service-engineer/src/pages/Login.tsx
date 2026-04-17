import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, UserRound } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const { worker, loginWorker, logout } = useAuth();
  const [employeeNumber, setEmployeeNumber] = useState('ENG-001');
  const [pin, setPin] = useState('1234');
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
    nav(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">СервисПро</h1>
          <p className="text-zinc-400 mt-2">Платформа выездного обслуживания</p>
        </div>

        {worker ? (
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
              onClick={logout}
              className="w-full bg-zinc-800 active:bg-zinc-700 p-4 rounded-2xl font-semibold min-h-[48px]"
            >
              Выйти из смены
            </button>
          </div>
        ) : (
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
        )}

        <button
          onClick={() => nav('/manager')}
          className="w-full bg-zinc-800 active:bg-zinc-700 p-4 rounded-2xl font-semibold min-h-[48px]"
        >
          Войти как начальник смены
        </button>
      </div>
    </div>
  );
}
