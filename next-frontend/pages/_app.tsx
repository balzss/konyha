import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getCustomTheme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const colorMode = 'dark';
  const mode = colorMode === 'dark' || colorMode === 'light' ? colorMode : 'light';
  const theme = getCustomTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
