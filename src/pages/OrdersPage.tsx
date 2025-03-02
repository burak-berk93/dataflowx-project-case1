// src/pages/ReportsPage.tsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import Orders from '../components/Orders';

const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Orders />
    </DashboardLayout>
  );
};

export default ReportsPage;
