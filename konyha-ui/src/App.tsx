import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import BottomNav from './components/BottomNav';
import RecipesPage from './pages/RecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import './App.scss';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Layout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RecipesPage />}/>
            <Route path="*" element={<RecipesPage />} />
          </Route>
          <Route path="/:recipeId" element={<RecipeDetailsPage />} />
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/edit/:recipeId" element={<AddRecipePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
