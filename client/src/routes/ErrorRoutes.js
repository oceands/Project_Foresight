//react
import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

// project imports
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../ui-components/Loadable";

// login routing
const page404 = Loadable(lazy(() => import("../pages/404page")));
const page401 = Loadable(lazy(() => import("../pages/401page")));

//-----------------------|| ERROR ROUTING ||-----------------------//

const ErrorRoutes = () => {
  const location = useLocation();

  return (
    <MinimalLayout>
      <Switch location={location} key={location.pathname}>
        <Route path="/404" component={page404} />
        <Route path="/401" component={page401} />
      </Switch>
    </MinimalLayout>
  );
};

export default ErrorRoutes;
