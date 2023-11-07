import React, { lazy } from "react";
import { Route, useLocation, Switch } from "react-router-dom";

// project imports
import Loadable from "../ui-components/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

// utilities routing - main
const Notifications = Loadable(lazy(() => import("../pages/notifications")));
const Incidents = Loadable(lazy(() => import("../pages/Incidents")));
const Usermgnt = Loadable(lazy(() => import("../pages/usermgnt")));
const Reports = Loadable(lazy(() => import("../pages/reports")));
const AI = Loadable(lazy(() => import("../pages/ai")));
const Contact = Loadable(lazy(() => import("../pages/contactUs")));
const FAQ = Loadable(lazy(() => import("../pages/faq")));
// utilities routing - settings
const CamSetting = Loadable(
  lazy(() => import("../pages/settings/dispatchsettings"))
);
const DispatchSettings = Loadable(
  lazy(() => import("../pages/settings/dispatchsettings"))
);
const FloorplanSettings = Loadable(
  lazy(() => import("../pages/settings/floorplansettings"))
);
const VersionInfo = Loadable(
  lazy(() => import("../pages/settings/versioninfo"))
);
const Security = Loadable(lazy(() => import("../pages/settings/security")));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Route
      path={[
        "/dashboard",
        "/notifications",
        "/incidents",
        "/usermgnt",
        "/reports",
        "/ai",
        "/contact",
        "/faq",
        "/settings/camsetting",
        "/settings/dispatchsettings",
        "/settings/floorplan",
        "/settings/versioninfo",
        "/settings/security",
      ]}
    >
      <AuthGuard>
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              <Topbar />
              <Switch location={location} key={location.pathname}>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/incidents" component={Incidents} />
                <Route path="/usermgnt" component={Usermgnt} />
                <Route path="/reports" component={Reports} />
                <Route path="/ai" component={AI} />
                <Route path="/contact" component={Contact} />
                <Route path="/faq" component={FAQ} />

                <Route path="/settings/camsetting" component={CamSetting} />
                <Route
                  path="/settings/dispatchsettings"
                  component={DispatchSettings}
                />
                <Route
                  path="/settings/floorplan"
                  component={FloorplanSettings}
                />
                <Route path="/settings/versioninfo" component={VersionInfo} />
                <Route path="/settings/security" component={Security} />
              </Switch>
            </main>
          </div>
        </MyProSidebarProvider>
      </AuthGuard>
    </Route>
  );
};

export default MainRoutes;
