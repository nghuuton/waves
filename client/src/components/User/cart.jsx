import React, { Component } from "react";

import UserLayout from "../../HOC/user";

import { connect } from "react-redux";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import { getCartItems } from "../../actions/user_actions";

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    };

    componentDidMount() {
        let cartItem = [];
        let user = this.props.user;
        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach((item) => {
                    cartItem.push(item._id);
                });
                this.props.dispatch(getCartItems(cartItem, user.userData.cart));
            }
        }
    }

    render() {
        return (
            <UserLayout>
                <div>cart</div>
            </UserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(UserCart);
