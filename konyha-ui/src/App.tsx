import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import BottomNav from './components/BottomNav';
import {
  MainPage,
  EditRecipePage,
  RecipeDetailsPage,
  UserPage,
  LoginPage,
  SignUpPage,
} from './pages';
import { getCarbonColorTheme } from './colorTheme';
import './App.scss';

function Layout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

function App() {
  const colorMode = localStorage.getItem('colorMode');
  const mode = colorMode === 'dark' || colorMode === 'light' ? colorMode : 'light';
  const theme = getCarbonColorTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />}/>
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<MainPage />} />
          </Route>
          <Route path="/:recipeSlug" element={<RecipeDetailsPage />} />
          <Route path="/:recipeSlug/edit" element={<EditRecipePage />} />
          <Route path="/add" element={<EditRecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
