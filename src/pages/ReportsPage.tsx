// src/pages/ReportsPage.tsx
import DashboardLayout from '../layouts/DashboardLayout';
import Reports from '../components/Reports';

const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Reports />
    </DashboardLayout>
  );
};

export default ReportsPage;
