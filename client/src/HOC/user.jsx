import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
    {
        name: "My account",
        linkTo: "/user/dashboard",
    },
    {
        name: "Uer information",
        linkTo: "/user/user-profile",
    },
    {
        name: "My Cart",
        linkTo: "/user/cart",
    },
];

const linksAdmin = [
    {
        name: "Site info",
        linkTo: "/admin/site-nfo",
    },
    {
        name: "Add products",
        linkTo: "/admin/add-product",
    },
    {
        name: "Manage categories",
        linkTo: "/admin/manage-categories",
    },
];

const UserLayout = (props) => {
    const generateLinks = (links) =>
        links.map((item, i) => (
            <Link key={i} to={item.linkTo}>
                {item.name}
            </Link>
        ));
    const generateLinksAdmin = (links) =>
        links.map((item, i) => (
            <Link key={i} to={item.linkTo}>
                {item.name}
            </Link>
        ));
    const adminLink = () => {
        return (
            <div>
                <h2>Admin</h2>
                <div className="links">{generateLinksAdmin(linksAdmin)}</div>
            </div>
        );
    };
    return (
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>
                    <div className="links">{generateLinks(links)}</div>
                    {props.user.userData.isAdmin ? adminLink() : null}
                </div>
                <div className="user_right">{props.children}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(UserLayout);
