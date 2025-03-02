// src/router/index.ts
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import OrdersPage from '../pages/OrdersPage';
import ReportsPage from '../pages/ReportsPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
