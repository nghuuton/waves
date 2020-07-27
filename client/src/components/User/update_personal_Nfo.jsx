import React, { Component } from "react";
import FormField from "../utils/Form/formField";
import {
    update,
    generateData,
    isFormValid,
    populateFields,
} from "../utils/Form/formAction";

import { connect } from "react-redux";

class UpdatepersonalNfo extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    name: "name_input",
                    type: "text",
                    placeholder: "Enter your name",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
            lastname: {
                element: "input",
                value: "",
                config: {
                    name: "lastname_input",
                    type: "text",
                    placeholder: "Enter your lastname",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
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

    componentDidMount() {
        const newFormdata = populateFields(this.state.formdata, this.props.user.userData);

        this.setState({ formdata: newFormdata });
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "update");
        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, "update");
        let formIsValid = isFormValid(this.state.formdata, "update");
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
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Personal information</h2>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={"name"}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={"lastname"}
                                formdata={this.state.formdata.lastname}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>
                    <div>
                        <FormField
                            id={"email"}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    {this.state.formSuccess ? (
                        <div className="form_success">Success</div>
                    ) : null}
                    {this.state.formError ? (
                        <div className="error_label">Please check your data</div>
                    ) : null}
                    <button type="submit" onClick={(event) => this.submitForm(event)}>
                        Update personal info
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(UpdatepersonalNfo);
