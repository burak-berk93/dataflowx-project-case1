import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import logodata from '../assets/data.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemIcon from '@mui/material/ListItemIcon';

// Props interface
interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Modern arka plan rengi
  boxShadow: 'none', // Shadow kaldırıldı
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.secondary.main, // Hafif koyu bir renk
    borderRight: `2px solid ${theme.palette.divider}`, // Sağ kenara ince bir çizgi
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Hover rengi
    borderRadius: theme.shape.borderRadius, // Yuvarlatılmış köşeler
  },
}));

// DashboardLayout component
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: 'white', // Yazı rengi beyaz
    '&:hover': {
      backgroundColor: theme.palette.primary.dark, // Daha koyu bir hover rengi
      transform: 'scale(1.05)', // Hafif büyüme efekti
      transition: 'all 0.3s ease', // Geçiş efekti
    },
  }));

  const drawerContent = (
<List>
  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
    <StyledListItem button>
      <ListItemIcon sx={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </StyledListItem>
  </Link>

  <Link to="/orders" style={{ textDecoration: 'none', color: 'white' }}>
    <StyledListItem button>
      <ListItemIcon sx={{ color: 'white' }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Diyagram" />
    </StyledListItem>
  </Link>

  <Link to="/reports" style={{ textDecoration: 'none', color: 'white' }}>
    <StyledListItem button>
      <ListItemIcon sx={{ color: 'white' }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </StyledListItem>
  </Link>
</List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <StyledAppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component="img"
            src={logodata}
            alt="Logo"
            sx={{
              height: { xs: 30, sm: 35, md: 40 }, // Mobilde küçülüyor
              marginRight: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          />

        </Toolbar>
      </StyledAppBar>

      {/* Drawer */}
      <StyledDrawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Daha iyi açılma performansı
        sx={{
          '& .MuiDrawer-paper': {
            top: isMobile ? 0 : 64, // AppBar'ın altından hizalandı
            height: isMobile ? '100%' : 'calc(100% - 64px)', // Drawer yüksekliği
            width: isMobile ? 280 : 240, // Menü genişliği artırıldı
          }
        }}
      >
        {drawerContent}
      </StyledDrawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: 5,
          marginLeft: isMobile ? 0 : 25, // Masaüstünde menünün genişliği kadar kaydır
          transition: 'margin 0.3s ease-in-out', // Geçiş efekti eklendi
        }}
      >
        {children}
      </Box>

    </Box>
  );
};

export default DashboardLayout;
