import { Outlet } from 'react-router-dom';
import BottomNav from '../components/ui/BottomNav';

export default function EngineerLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <Outlet />
      <BottomNav />
    </div>
  );
}
