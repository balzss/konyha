import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BottomNav from './components/BottomNav';
import RecipesPage from './pages/RecipesPage';
import './App.scss';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <ThemeProvider theme={theme}>
      { currentPage === 0 && <RecipesPage/>}
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </ThemeProvider>
  );
}

export default App;
