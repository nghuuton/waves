import React from "react";
import UserLayout from "../../HOC/user";
import UpdatepersonalNfo from "./update_personal_Nfo";

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatepersonalNfo />
        </UserLayout>
    );
};

export default UpdateProfile;
