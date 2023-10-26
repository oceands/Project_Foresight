import { useState } from "react";
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
import Login from "./pages/login"
const App = () => {
  const [theme, colorMode] = useMode();
  const [welcomeText, setWelcomeText] = useState("Welcome Back, Admin");

  // Function to change the welcome text
  const changeWelcomeText = (newText) => {
    setWelcomeText(newText);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
            <Topbar welcomeText={welcomeText} />
              <Routes>
                
                <Route path="/" element={<Dashboard changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/notifications" element={<Notifications changeWelcomeText={changeWelcomeText} />} />
                <Route path="/incidents" element={<Incidents changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/usermgnt" element={<Usermgnt changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/reports" element={<Reports changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/ai" element={<AI/>} />
                {/*Removed index.jsx for settings since we need seperate routes */}
                <Route path="/settings/camera" element={<CamSetting changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/settings/dispatch" element={<DispatchSettings changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/settings/floorplan" element={<FloorplanSettings changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/settings/versioninfo" element={<VersionInfo changeWelcomeText={changeWelcomeText}/>} />
                  <Route path="/settings/security" element={<Security changeWelcomeText={changeWelcomeText}/>} />
                {/*Newly added routes */}  
                <Route path="/faq" element={<FAQ changeWelcomeText={changeWelcomeText} />} />
                <Route path="/contact" element={<Contact changeWelcomeText={changeWelcomeText}/>} />
                <Route path="/login" element={<Login/>} />

              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
