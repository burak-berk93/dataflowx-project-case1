// src/pages/OrdersPage.tsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../components/Dashboard';

const OrdersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default OrdersPage;
