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

import Contact from "./pages/contactUs";
import FAQ from "./pages/faq";
import CamSetting from "./pages/settings/camsetting";
import DispatchSettings from "./pages/settings/dispatchsettings";
import FloorplanSettings from "./pages/settings/floorplansettings";
import VersionInfo from "./pages/settings/versioninfo";
import Security from "./pages/settings/security";
import CreateReport from "./pages/createReport"
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
                {/*Removed index.jsx for settings since we need seperate routes */}
                  <Route path="/settings/camera" element={<CamSetting/>} />
                  <Route path="/settings/dispatch" element={<DispatchSettings/>} />
                  <Route path="/settings/floorplan" element={<FloorplanSettings/>} />
                  <Route path="/settings/versioninfo" element={<VersionInfo/>} />
                  <Route path="/settings/security" element={<Security/>} />
                {/*Newly added routes */}  
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/createreport" element={<CreateReport/>} />

              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
