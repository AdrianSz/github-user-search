import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#fff',
    },
    primary: {
      main: '#2de1c2',
      contrastText: '#fff',
    },
    text: {
      primary: '#23233c',
      secondary: '#6c7a89',
    },
  },
  typography: {
    fontFamily: [
      'Urbanist',
      'Lexend',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: 'Lexend, Urbanist, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Urbanist, Inter, sans-serif',
      fontSize: '1.125rem',
    },
    body2: {
      fontFamily: 'Urbanist, Inter, sans-serif',
      fontSize: '1rem',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '1.1rem',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [
          {
            fontFamily: 'Lexend',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `url(https://fonts.gstatic.com/s/lexend/v7/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsX.woff2) format('woff2')`,
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
          },
          {
            fontFamily: 'Lexend',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 600,
            src: `url(https://fonts.gstatic.com/s/lexend/v7/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsX.woff2) format('woff2')`,
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
          },
          {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `url(https://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyMqgdyNOStf.woff2) format('woff2')`,
            unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
          },
        ],
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(45, 225, 194, 0.15)',
          fontWeight: 700,
          padding: '0.75rem 2rem',
          fontSize: '1.1rem',
        },
        containedPrimary: {
          backgroundColor: '#2de1c2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#23bfa7',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 4px 24px 0 rgba(35, 35, 60, 0.08)',
        },
      },
    },
  }
}); 