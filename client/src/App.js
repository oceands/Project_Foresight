//third-party
import { CssBaseline, ThemeProvider } from "@mui/material";

//project imports
import { ColorModeContext, useMode } from "./theme";
import AppRoutes from "./routes";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
