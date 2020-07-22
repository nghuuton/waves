import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./HOC/layout";
import RegisterLogin from "./components/Register_login";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register-login" exact component={RegisterLogin} />
            </Switch>
        </Layout>
    );
};

export default Routes;
