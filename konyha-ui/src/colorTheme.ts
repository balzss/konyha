import { createTheme } from '@mui/material/styles';

export function getMUI3ColorTheme(mode: 'dark' | 'light') {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          background: {
            paper: '#1C1B1F',
          },
          text: {
            primary: '#E6E1E5',
          }
        }
        : {
          background: {
            paper: '#FFFBFE',
          },
          text: {
            primary: '#1C1B1F',
          }
        }
      ),
    },
  });
}
