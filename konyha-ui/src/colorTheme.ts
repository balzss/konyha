import { createTheme } from '@mui/material/styles';

export function getCarbonColorTheme(mode: 'dark' | 'light') {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          background: {
            default: '#161616',
            paper: '#262626',
          },
          text: {
            primary: '#E6E1E5',
          }
        }
        : {
          text: {
            primary: '#1C1B1F',
          }
        }
      ),
    },
  });
}
