import AppRouter from './router/index';
import { ThemeProvider } from '@mui/material/styles';
import { TeamProvider } from './context/TeamContext';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TeamProvider>
        <AppRouter />
      </TeamProvider>
    </ThemeProvider>
  );
};

export default App;
