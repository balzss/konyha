import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCustomTheme } from '../utils/theme';

type CustomThemeProviderProps = {
  children: ReactNode;
};

export default function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { data: sessionData } = useSession();
  const userThemePreference = sessionData?.theme as 'light' | 'dark';
  const browserPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = userThemePreference || (browserPrefersDark ? 'dark' : 'light');
  const theme = getCustomTheme(mode);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
