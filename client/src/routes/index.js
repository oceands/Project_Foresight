import React from "react";
import { Redirect, Switch } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import ErrorRoutes from "./ErrorRoutes";

// project imports
import config from "../config";

//-----------------------|| ROUTING RENDER ||-----------------------//

const AppRoutes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to={config.defaultPath} />

      <React.Fragment>
        {/* Route for login */}
        <AuthenticationRoutes />

        {/* Routes for main layouts */}
        <MainRoutes />

        {/*Error Routes */}
        <ErrorRoutes />
      </React.Fragment>
    </Switch>
  );
};

export default AppRoutes;
