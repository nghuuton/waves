import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { auth } from "../actions/user_actions";

export default function (ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true,
        };
        componentDidMount() {
            this.props.dispatch(auth()).then((response) => {
                let user = this.props.user.userData;
                if (!user.isAuth) {
                    // Not login
                    if (reload) {
                        // Private Route
                        this.props.history.push("/register-login");
                    }
                } else {
                    // Do login
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push("/user/dashboard");
                    } else {
                        if (reload === false) {
                            // Public Route
                            this.props.history.push("/user/dashboard");
                        }
                    }
                }
                this.setState({
                    loading: false,
                });
            });
        }

        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color: "#2196f3" }} thickness={7} />
                    </div>
                );
            }
            return <ComposedClass {...this.props} user={this.props.user} />;
        }
    }
    function mapStateToProps(state) {
        return {
            user: state.user,
        };
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}
