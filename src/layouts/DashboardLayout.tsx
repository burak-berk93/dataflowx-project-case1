import  { useState } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Drawer, List, ListItem, ListItemText, Toolbar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme } from '@mui/material';
import logodata from '../assets/data.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemIcon from '@mui/material/ListItemIcon';


interface DashboardLayoutProps {
  children: React.ReactNode;
}


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, 
  boxShadow: 'none', 
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.secondary.main, 
    borderRight: `2px solid ${theme.palette.divider}`,
  },
}));




const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const StyledListItem = styled(ListItem)<{ button?: boolean }>(({ theme }) => ({
    color: 'white', 
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'scale(1.05)',
      transition: 'all 0.3s ease',
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
      <ListItemText primary="Diagram" />
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
              height: { xs: 30, sm: 35, md: 40 }, 
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
        ModalProps={{ keepMounted: true }} 
        sx={{
          '& .MuiDrawer-paper': {
            top: isMobile ? 0 : 64, 
            height: isMobile ? '100%' : 'calc(100% - 64px)', 
            width: isMobile ? 280 : 240, 
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
          marginLeft: isMobile ? 0 : 25, 
          transition: 'margin 0.3s ease-in-out', 
        }}
      >
        {children}
      </Box>

    </Box>
  );
};

export default DashboardLayout;
