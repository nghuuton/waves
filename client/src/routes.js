import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./HOC/layout";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Layout>
    );
};

export default Routes;
