import React from "react";
import { useTeamContext } from "../context/TeamContext";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ReportPage: React.FC = () => {
  const { teams } = useTeamContext();

  // Prepare data for the pie chart
  const chartDataPie = {
    labels: teams.map((team) => team.name),
    datasets: [
      {
        data: teams.map((team) => team.users.length),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
      },
    ],
  };

  // Prepare data for the bar chart
  const chartDataBar = {
    labels: teams.map((team) => team.name),
    datasets: [
      {
        label: "User Count",
        data: teams.map((team) => team.users.length),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // Define columns for the user table
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "team", headerName: "Team", width: 150 },
  ];

  // Map users to table rows
  const rows = teams.flatMap((team) =>
    team.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email || "N/A",
      phone: user.phone || "N/A",
      team: team.name,
    }))
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom color="primary">
        📊 Team Report
      </Typography>

      {/* Team Cards */}
      <Grid container spacing={2}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, minHeight: 150 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {team.name}
                </Typography>
                <Typography variant="body2">
                  User Count: {team.users.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pie Chart */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Distribution by Team (Pie Chart)
          </Typography>
          <Box sx={{ height: { xs: 300, sm: 400 } }}>
            <Pie data={chartDataPie} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
          </Box>
        </Card>
      </Box>

      {/* Bar Chart */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Distribution by Team (Bar Chart)
          </Typography>
          <Box sx={{ height: { xs: 300, sm: 400 } }}>
            <Bar data={chartDataBar} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
          </Box>
        </Card>
      </Box>

      {/* User Table */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>
          <DataGrid rows={rows} columns={columns} />
        </Card>
      </Box>
    </Container>
  );
};

export default ReportPage;
