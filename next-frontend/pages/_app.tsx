import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getCustomTheme } from '../utils/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const colorMode = 'dark';
  const mode = colorMode === 'dark' || colorMode === 'light' ? colorMode : 'light';
  const theme = getCustomTheme(mode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
