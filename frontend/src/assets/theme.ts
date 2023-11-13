import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D33753',
    },

  },
  typography: {
    fontFamily: '"Samsung-Light","Samsung-Regular"',
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.MuiBedIcon-root': {
            color: '#757575',
          },
          '&.MuiBathtubIcon-root': {
            color: '#757575',
          },
        },
      },
    },
  },

});

export default theme;
