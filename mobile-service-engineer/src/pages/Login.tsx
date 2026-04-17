import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-6 gap-4">
      <h1 className="text-4xl font-bold">СервисПро</h1>
      <p className="text-zinc-400">Платформа выездного обслуживания</p>

      <button
        onClick={() => nav("/engineer")}
        className="w-full max-w-sm bg-blue-600 p-4 rounded-2xl"
      >
        Войти как инженер
      </button>

      <button
        onClick={() => nav("/manager")}
        className="w-full max-w-sm bg-zinc-800 p-4 rounded-2xl"
      >
        Войти как начальник смены
      </button>
    </div>
  );
}
