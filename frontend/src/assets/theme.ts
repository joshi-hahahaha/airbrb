import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D33753',
    },
    // 你可以在这里添加更多的颜色
  },
  typography: {
    fontFamily: '"Samsung-Light","Samsung-Regular"',
  },
  // 你也可以添加其他主题选项
});

export default theme;
