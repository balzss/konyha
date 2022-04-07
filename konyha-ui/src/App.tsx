import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BottomNav from './components/BottomNav';
import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipesPage />}/>
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/edit/:recipeId" element={<AddRecipePage />} />
          <Route path="*" element={<RecipesPage />} />
        </Routes>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
