import { BrowserRouter, Routes, Route } from "react-router-dom";

import { OrderProvider } from "./context/OrderContext";
import { ManagerProvider } from "./context/ManagerContext";

// Pages
import Login from "./pages/Login";

// Engineer
import EngineerLayout from "./layouts/EngineerLayout";
import EngineerDashboard from "./pages/engineer/Dashboard";
import OrderDetail from "./pages/engineer/OrderDetail";
import WorkScreen from "./pages/engineer/WorkScreen";
import SignScreen from "./pages/engineer/SignScreen";
import MapScreen from "./pages/engineer/MapScreen";
import PartsScreen from "./pages/engineer/PartsScreen";
import ChatScreen from "./pages/engineer/ChatScreen";

// Manager
import ManagerLayout from "./layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/Dashboard";
import OrdersPage from "./pages/manager/OrdersPage";
import EngineersPage from "./pages/manager/EngineersPage";
import WarehousePage from "./pages/manager/WarehousePage";
import AnalyticsPage from "./pages/manager/AnalyticsPage";

export default function App() {
  return (
      <OrderProvider>
        <ManagerProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/" element={<Login />} />

              {/* Engineer routes */}
              <Route element={<EngineerLayout />}>
                <Route path="/engineer" element={<EngineerDashboard />} />
                <Route path="/engineer/order/:id" element={<OrderDetail />} />
                <Route path="/engineer/order/:id/work" element={<WorkScreen />} />
                <Route path="/engineer/order/:id/sign" element={<SignScreen />} />
                <Route path="/engineer/map" element={<MapScreen />} />
                <Route path="/engineer/parts" element={<PartsScreen />} />
                <Route path="/engineer/chat" element={<ChatScreen />} />
              </Route>

              {/* Manager routes */}
              <Route element={<ManagerLayout />}>
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route path="/manager/orders" element={<OrdersPage />} />
                <Route path="/manager/engineers" element={<EngineersPage />} />
                <Route path="/manager/warehouse" element={<WarehousePage />} />
                <Route path="/manager/analytics" element={<AnalyticsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ManagerProvider>
      </OrderProvider>
  );
}