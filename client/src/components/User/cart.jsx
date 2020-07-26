import React, { Component } from "react";

import UserLayout from "../../HOC/user";

import { connect } from "react-redux";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import { getCartItems, removeItem } from "../../actions/user_actions";
import UserProductBlock from "../utils/User/product_block";
import Paypal from "../utils/paypal";

//AZPgbZgP2zp4RIXxkpjCQHxGwt4PdyxyLOXL_qfLSr0RZEdtl-o-V7GzE1K3oRbdrqnyRIhxuTdzzb-q
class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    };

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;
        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach((item) => {
                    cartItems.push(item._id);
                });
                this.props
                    .dispatch(getCartItems(cartItems, user.userData.cart))
                    .then((response) => {
                        if (this.props.user.cartDetail.length > 0) {
                            this.caculateTotal(this.props.user.cartDetail);
                        }
                    });
            }
        }
    }

    caculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.forEach((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        this.setState({ total, showTotal: true });
    };

    removeFromCart = (_id) => {
        this.props.dispatch(removeItem(_id)).then((response) => {
            if (response.payload.cartDetail.length > 0) {
                const cartDetail = response.payload.cartDetail;
                const cart = response.payload.cart;
                cart.forEach((item) => {
                    cartDetail.forEach((k, i) => {
                        if (item._id === k._id) {
                            cartDetail[i].quantity = item.quantity;
                        }
                    });
                });
                this.caculateTotal(cartDetail);
            } else {
                this.setState({ showTotal: false });
            }
        });
    };
    showNoItemmessage = () => {
        return (
            <div className="cart_no_items">
                <FontAwesomeIcon icon={faFrown} />
                <div>You have no items.</div>
            </div>
        );
    };

    transactionError = (data) => {};

    transactionCancel = (data) => {};

    transactionSuccess = (data) => {};

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(_id) => this.removeFromCart(_id)}
                        />
                        {this.state.showTotal ? (
                            <div>
                                <div className="user_cart_sum">
                                    <div>Total amount: $ {this.state.total}</div>
                                </div>
                            </div>
                        ) : this.state.showSuccess ? (
                            <div className="cart_success">
                                <FontAwesomeIcon icon={faSmile} />
                                <div>Thank you</div>
                                <div>YOUR ORDER IS NOW COMPLETE</div>
                            </div>
                        ) : (
                            this.showNoItemmessage()
                        )}
                    </div>
                    {this.state.showTotal ? (
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={(data) => this.transactionError(data)}
                                transactionCancel={(data) => this.transactionCancel(data)}
                                onSuccess={(data) => this.transactionSuccess(data)}
                            />
                        </div>
                    ) : null}
                </div>
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
