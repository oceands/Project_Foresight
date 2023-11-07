//react
import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import GuestGuard from '../utils/route-guard/GuestGuard';
import MinimalLayout from '../layout/MinimalLayout';
import Loadable from '../ui-components/Loadable';


// login routing
const AuthLogin = Loadable(lazy(() => import('../pages/login')));
//const AuthRegister = Loadable(lazy(() => import('../views/pages/authentication/register')));

//-----------------------|| AUTH ROUTING ||-----------------------//

const AuthenticationRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/login']}>
            <MinimalLayout>
                <Switch location={location} key={location.pathname}>

                        <GuestGuard>
                            <Route path="/login" component={AuthLogin} />
                            {/* {<Route path="/register" component={AuthRegister} />} */}
                        </GuestGuard>

                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default AuthenticationRoutes;