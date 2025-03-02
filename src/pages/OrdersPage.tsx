// src/pages/ReportsPage.tsx
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
