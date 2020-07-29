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
import ManageCategories from "./components/User/Admin/manage_categories";
import ProductPage from "./components/Product";
import UserCart from "./components/User/cart";
import UpdateProfile from "./components/User/user_profile";
import ManageSite from "./components/User/Admin/manage_site";
import NotFound from "./components/utils/not_found";
import AddFile from "./components/User/Admin/add_file";

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/shop" exact component={Auth(Shop, null)} />

                <Route
                    path="/product-details/:id"
                    exact
                    component={Auth(ProductPage, null)}
                />
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
                <Route
                    path="/admin/manage-categories"
                    exact
                    component={Auth(ManageCategories, true)}
                />
                <Route path="/user/cart" exact component={Auth(UserCart, true)} />
                <Route
                    path="/user/user-profile"
                    exact
                    component={Auth(UpdateProfile, true)}
                />
                <Route path="/admin/site-nfo" exact component={Auth(ManageSite, true)} />
                <Route path="/admin/add-file" exact component={Auth(AddFile, true)} />
                <Route component={Auth(NotFound, false)} />
            </Switch>
        </Layout>
    );
};

export default Routes;
