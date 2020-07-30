import React, { Component } from "react";
import axios from "axios";

import FormField from "../utils/Form/formField";
import { update, generateData, isFormValid } from "../utils/Form/formAction";

class ResetUser extends Component {
    state = {
        formError: false,
        formSucces: false,
        formdata: {
            email: {
                element: "input",
                value: "",
                config: {
                    name: "email_input",
                    type: "email",
                    placeholder: "Enter your email",
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
        },
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "reset_email");
        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, "reset_email");
        let formIsValid = isFormValid(this.state.formdata, "reset_email");
        if (formIsValid) {
            console.log(dataToSubmit);
        } else {
            this.setState({
                formError: true,
            });
        }
    };

    render() {
        return (
            <div className="container">
                <h1>Reset password</h1>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={"email"}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formSucces ? (
                        <div className="form_success">Done, Check your Email</div>
                    ) : null}
                    {this.state.formError ? (
                        <div className="error_label">Please check your data</div>
                    ) : null}
                    <button type="submit" onClick={(event) => this.submitForm(event)}>
                        Send email to reset password
                    </button>
                </form>
            </div>
        );
    }
}

export default ResetUser;
