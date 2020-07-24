import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./HOC/layout";
import RegisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register";
import UserDashboard from "./components/User";

import Auth from "./HOC/auth";
import Shop from "./components/Shop";
import AddProduct from "./components/User/Admin/add_product";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/shop" exact component={Auth(Shop, null)} />
                <Route path="/register" exact component={Auth(Register, false)} />
                <Route
                    path="/register-login"
                    exact
                    component={Auth(RegisterLogin, false)}
                />
                <Route
                    path="/user/dashboard"
                    exact
                    component={Auth(UserDashboard, true)}
                />
                <Route
                    path="/admin/add-product"
                    exact
                    component={Auth(AddProduct, true)}
                />
            </Switch>
        </Layout>
    );
};

export default Routes;
