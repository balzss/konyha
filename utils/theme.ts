import { createTheme } from '@mui/material/styles';

export function getCustomTheme(mode: 'dark' | 'light') {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
          primary: {
            main: '#F49196',
          },
          background: {
            default: '#161616', // carbon design GRAY100
            paper: '#262626', // carbon design GRAY90
          },
          divider: '#8d8d8d', // carbon design GRAY50
          text: {
            primary: '#E6E1E5', // material 3
          }
        }
        : {
          primary: {
            main: '#FA4C4F',
          },
          background: {
            default: '#f4f4f4',
            paper: '#fff',
          },
          divider: '#8d8d8d', // carbon design GRAY50
          text: {
            primary: '#1C1B1F', // material 3
          }
        }
      ),
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0, // custom
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px', // material 3
          },
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // material 3
          },
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // material 3
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // material 3
          },
        },
      },
    },
  });
}
