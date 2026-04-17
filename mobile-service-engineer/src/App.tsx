import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EngineerDashboard from "./pages/engineer/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/engineer" element={<EngineerDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
