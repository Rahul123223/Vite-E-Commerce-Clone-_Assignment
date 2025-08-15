// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: "#1976d2", // Default blue
    },
    secondary: {
      main: "#dc004e", // Default pink
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
