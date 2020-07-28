import React from "react";
import UserLayout from "../../HOC/user";
import MyButton from "../utils/button";
import UserHistoryBlock from "../utils/User/history_block";

const UserDashboard = ({ user }) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User infomation</h1>
                    <div>
                        <span>name: {user.userData.name}</span>
                        <span>lastname: {user.userData.lastname}</span>
                        <span>email: {user.userData.email}</span>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user-profile"
                    />
                </div>
                {user.userData.history ? (
                    <div className="user_nfo_panel">
                        <h1>History purchases</h1>
                        <div className="user_product_block_wrapper">
                            <UserHistoryBlock products={user.userData.history} />
                        </div>
                    </div>
                ) : null}
            </div>
        </UserLayout>
    );
};

export default UserDashboard;
