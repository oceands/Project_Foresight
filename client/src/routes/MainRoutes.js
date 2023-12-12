import React, { lazy } from "react";
import { Route, useLocation, Switch } from "react-router-dom";

// project imports
import Loadable from "../ui-components/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";
import RoleGuard from "../utils/route-guard/RolesGuard";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const Feed = Loadable(lazy(() => import("../pages/viewFeed")));

// utilities routing - main
const UserProfile = Loadable(lazy(() => import("../pages/userprofile")));
const Notifications = Loadable(lazy(() => import("../pages/notifications")));
const Incidents = Loadable(lazy(() => import("../pages/Incidents")));
const Usermgnt = Loadable(lazy(() => import("../pages/usermgnt")));
const Reports = Loadable(lazy(() => import("../pages/reports")));
const Contact = Loadable(lazy(() => import("../pages/contactUs")));
const FAQ = Loadable(lazy(() => import("../pages/faq")));
// utilities routing - settings
const CamSetting = Loadable(lazy(() => import("../pages/settings/camsetting")));
const DispatchSettings = Loadable(
  lazy(() => import("../pages/settings/dispatchsettings"))
);
const VersionInfo = Loadable(
  lazy(() => import("../pages/settings/versioninfo"))
);
const Security = Loadable(lazy(() => import("../pages/settings/security")));

//404 message
const Page404 = Loadable(lazy(() => import("../pages/404page")));
const Page401 = Loadable(lazy(() => import("../pages/401page")));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route path="/401" component={Page401} />
      <Route
        path={[
          "/dashboard",
          "/view_feed",
          "/notifications",
          "/incidents",
          "/usermgnt",
          "/reports",
          "/contact",
          "/faq",
          "/myprofile",
          "/settings/camsetting",
          "/settings/dispatchsettings",
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
                  <Route path="/dashboard">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Dashboard />
                    </RoleGuard>
                  </Route>
                  <Route path="/view_feed">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Feed />
                    </RoleGuard>
                  </Route>
                  <Route path="/notifications">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Notifications />
                    </RoleGuard>
                  </Route>
                  <Route path="/incidents">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Incidents />
                    </RoleGuard>
                  </Route>
                  <Route path="/usermgnt">
                    <RoleGuard requiredRole={["Super Administrator"]}>
                      <Usermgnt />
                    </RoleGuard>
                  </Route>
                  <Route path="/reports">
                    <RoleGuard
                      requiredRole={["Super Administrator", "Administrator"]}
                    >
                      <Reports />
                    </RoleGuard>
                  </Route>

                  <Route path="/contact">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Contact />
                    </RoleGuard>
                  </Route>
                  <Route path="/faq">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <FAQ />
                    </RoleGuard>
                  </Route>
                  <Route path="/myprofile">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <UserProfile />
                    </RoleGuard>
                  </Route>
                  <Route path="/settings/camsetting">
                    <RoleGuard requiredRole={["Super Administrator"]}>
                      <CamSetting />
                    </RoleGuard>
                  </Route>
                  <Route path="/settings/dispatchsettings">
                    <RoleGuard requiredRole={["Super Administrator"]}>
                      <DispatchSettings />
                    </RoleGuard>
                  </Route>
                  <Route path="/settings/versioninfo">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <VersionInfo />
                    </RoleGuard>
                  </Route>
                  <Route path="/settings/security">
                    <RoleGuard
                      requiredRole={[
                        "Super Administrator",
                        "Administrator",
                        "Normal User",
                      ]}
                    >
                      <Security />
                    </RoleGuard>
                  </Route>
                </Switch>
              </main>
            </div>
          </MyProSidebarProvider>
        </AuthGuard>
      </Route>
      <Route path="*" component={Page404} />
    </Switch>
  );
};

export default MainRoutes;
