import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import BottomNav from './components/BottomNav';
import RecipesPage from './pages/RecipesPage';
import EditRecipePage from './pages/EditRecipePage';
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
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RecipesPage />}/>
            <Route path="*" element={<RecipesPage />} />
          </Route>
          <Route path="/:recipeSlug" element={<RecipeDetailsPage />} />
          <Route path="/:recipeSlug/edit" element={<EditRecipePage />} />
          <Route path="/add" element={<EditRecipePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
