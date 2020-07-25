import React, { Component } from "react";

import FormField from "../../utils/Form/formField";
import {
    update,
    generateData,
    isFormValid,
    resetFields,
} from "../../utils/Form/formAction";

import { connect } from "react-redux";
import { getWoods, addWood } from "../../../actions/products_actions";

class MaageWoods extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Wood name",
                    name: "wood_input",
                    type: "text",
                    placeholder: "Enter the wood",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
        },
    };

    componentDidMount() {
        this.props.dispatch(getWoods());
    }

    showCategoryItems = () =>
        this.props.products.woods
            ? this.props.products.woods.map((item, i) => (
                  <div className="category_item" key={i}>
                      {item.name}
                  </div>
              ))
            : null;

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "wood");
        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, "wood");
        this.setState(
            {
                formdata: newFormdata,
                formSuccess: true,
            },
            () => {
                setTimeout(() => {
                    this.setState({ formSuccess: "", formError: false });
                }, 3000);
            }
        );
    };

    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, "wood");
        let formIsValid = isFormValid(this.state.formdata, "wood");
        if (formIsValid) {
            this.props
                .dispatch(addWood(dataToSubmit, this.props.products.woods))
                .then((response) => {
                    if (response.payload.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true,
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
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">{this.showCategoryItems()}</div>
                    </div>
                    <div className="right">
                        <form onSubmit={(event) => this.submtForm(event)}>
                            <FormField
                                id={"name"}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                            {this.state.formSuccess ? (
                                <div className="form_success">Success</div>
                            ) : null}
                            {this.state.formError ? (
                                <div className="error_label">Please check your data</div>
                            ) : null}
                            <button
                                type="submit"
                                onClick={(event) => this.submitForm(event)}
                            >
                                Add wood
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

export default connect(mapStateToProps)(MaageWoods);
