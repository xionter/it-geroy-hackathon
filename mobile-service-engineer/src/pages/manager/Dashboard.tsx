export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-3xl font-bold">Панель начальника смены</h1>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-zinc-400">Инженеры онлайн</p>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-zinc-400">Срочные заявки</p>
          <p className="text-3xl font-bold mt-2 text-red-400">2</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-2xl">
          <p className="text-zinc-400">Готовые ремкомплекты</p>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
