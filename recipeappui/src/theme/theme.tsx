// theme.ts
import { createTheme } from '@material-ui/core/styles';

// Customize your global theme here
const theme = createTheme({
  typography: {
    // Set your global font family here
    fontFamily: 'Arial, sans-serif',
    // Customize specific variants if needed
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Removes all-caps styling on buttons
    },
  },
});

export default theme;
