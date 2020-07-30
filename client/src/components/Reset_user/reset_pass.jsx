import React, { Component } from "react";

import axios from "axios";

import FormField from "../utils/Form/formField";
import { update, generateData, isFormValid } from "../utils/Form/formAction";
import Dialog from "@material-ui/core/Dialog";

class ResetPass extends Component {
    state = {
        resetToken: "",
        formError: false,
        formErrorMessage: "",
        formSuccess: false,
        formdata: {
            password: {
                element: "input",
                value: "",
                config: {
                    name: "password_input",
                    type: "password",
                    placeholder: "Enter your password",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
            confirmPassword: {
                element: "input",
                value: "",
                config: {
                    name: "confirm_password_input",
                    type: "password",
                    placeholder: "Confirm your password",
                },
                validation: {
                    required: true,
                    confirm: "password",
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
        },
    };

    componentDidMount() {
        const resetToken = this.props.match.params.token;
        this.setState({ resetToken });
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "reset_password");
        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, "reset_password");
        let formIsValid = isFormValid(this.state.formdata, "reset_password");
        dataToSubmit.token = this.state.resetToken;
        if (formIsValid) {
            axios.post("/api/user/reset-password", dataToSubmit).then((response) => {
                if (response.data.success) {
                    this.setState({ formSuccess: true }, () =>
                        setTimeout(() => {
                            this.props.history.push("/register-login");
                        }, 2000)
                    );
                } else {
                    this.setState({
                        formError: true,
                        formErrorMessage: response.data.message,
                    });
                }
            });
        } else {
            this.setState({
                formError: true,
            });
        }
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Reset password</h2>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={"password"}
                                formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={"confirmPassword"}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>
                    {this.state.formError ? (
                        <div className="error_label">{this.state.formErrorMessage}</div>
                    ) : (
                        ""
                    )}
                    <button type="submit" onClick={(event) => this.submitForm(event)}>
                        Reset password
                    </button>
                </form>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Alright !!</div>
                        <div>
                            You will be redirected to the LOGIN in a couple seconds...
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ResetPass;
