import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./HOC/layout";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register";
import UserDashboard from "./components/User";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register-login" exact component={RegisterLogin} />
                <Route path="/register" exact component={Register} />
                <Route path="/user/dashboard" exact component={UserDashboard} />
            </Switch>
        </Layout>
    );
};

export default Routes;
