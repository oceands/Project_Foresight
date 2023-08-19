import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Notifications from "./pages/notifications";
import Incidents from "./pages/Incidents";
import Usermgnt from "./pages/usermgnt";
import Reports from "./pages/reports";
import AI from "./pages/ai";
import Settings from "./pages/settings";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";


const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Routes>
                
                <Route path="/" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/usermgnt" element={<Usermgnt />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />

              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
