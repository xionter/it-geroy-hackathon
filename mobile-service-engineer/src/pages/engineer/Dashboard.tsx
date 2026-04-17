export default function EngineerDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4">
      <h1 className="text-3xl font-bold">Мои заявки</h1>
      <p className="text-zinc-400 mt-1">Сегодняшние выезды</p>

      <div className="mt-6 space-y-4">
        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-red-400 font-semibold">СРОЧНО</p>
          <h2 className="text-xl mt-2">Человек застрял в лифте</h2>
          <p className="text-zinc-400">ул. Ленина, 12</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-yellow-400 font-semibold">СРЕДНИЙ</p>
          <h2 className="text-xl mt-2">Неисправность банкомата</h2>
          <p className="text-zinc-400">ТЦ Центральный</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-green-400 font-semibold">ПЛАНОВО</p>
          <h2 className="text-xl mt-2">Обслуживание кондиционера</h2>
          <p className="text-zinc-400">Бизнес-центр Альфа</p>
        </div>
      </div>
    </div>
  );
}
