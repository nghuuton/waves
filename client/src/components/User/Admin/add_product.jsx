import React, { Component } from "react";
import UserLayout from "../../../HOC/user";

import FileUpload from "../../utils/Form/fileUpload";

import FormField from "../../utils/Form/formField";
import {
    update,
    generateData,
    isFormValid,
    populateOptionFields,
    resetFields,
} from "../../utils/Form/formAction";

import { connect } from "react-redux";
import { getBrands, getWoods, addProduct } from "../../../actions/products_actions";

class AddProduct extends Component {
    state = {
        formError: false,
        formSuccess: "",
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Product name",
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
                showLabel: true,
            },
            description: {
                element: "textarea",
                value: "",
                config: {
                    label: "Product description",
                    name: "description_input",
                    type: "text",
                    placeholder: "Enter your description",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            price: {
                element: "input",
                value: "",
                config: {
                    label: "Product price",
                    name: "price_input",
                    type: "number",
                    placeholder: "Enter your price",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            brand: {
                element: "select",
                value: "",
                config: {
                    label: "Product brand",
                    name: "brands_input",
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            shipping: {
                element: "select",
                value: "",
                config: {
                    label: "Shipping",
                    name: "shipping_input",
                    options: [
                        { key: true, value: "Yes" },
                        { key: false, value: "No" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            available: {
                element: "select",
                value: "",
                config: {
                    label: "Availbale, in stock",
                    name: "availbale_input",
                    options: [
                        { key: true, value: "Yes" },
                        { key: false, value: "No" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            wood: {
                element: "select",
                value: "",
                config: {
                    label: "Wood material",
                    name: "wood_input",
                    options: [],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            frets: {
                element: "select",
                value: "",
                config: {
                    label: "Frets",
                    name: "frets_input",
                    options: [
                        { key: 20, value: 20 },
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 24, value: 24 },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            publish: {
                element: "select",
                value: "",
                config: {
                    label: "Publish",
                    name: "publish_input",
                    options: [
                        { key: true, value: "Public" },
                        { key: false, value: "Hidden" },
                    ],
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showLabel: true,
            },
            images: {
                value: [],
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: false,
            },
        },
    };

    componentDidMount() {
        const formdata = this.state.formdata;
        this.props.dispatch(getBrands()).then((response) => {
            const newFormdata = populateOptionFields(
                formdata,
                this.props.products.brands,
                "brand"
            );
            this.updateField(newFormdata);
        });
        this.props.dispatch(getWoods()).then((response) => {
            const newFormdata = populateOptionFields(
                formdata,
                this.props.products.woods,
                "wood"
            );
            this.updateField(newFormdata);
        });
    }

    updateField = (formdata) => {
        this.setState({ formdata });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "products");
        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };

    resetFieldHandler = () => {
        const newFormdata = resetFields(this.state.formdata, "products");
        this.setState({
            formSuccess: true,
            formdata: newFormdata,
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(this.state.formdata, "products");
        console.log(dataToSubmit);
        let formIsValid = isFormValid(this.state.formdata, "register");
        if (formIsValid) {
            console.log(dataToSubmit);
            this.props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (this.props.products.addProduct.success) {
                    this.resetFieldHandler();
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

    imagesHandler = (images) => {
        const newFormData = { ...this.state.formdata };
        newFormData["images"].value = images;
        newFormData["images"].valid = true;

        this.setState({
            formdata: newFormData,
        });
    };

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(event) => this.submbitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={"name"}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"description"}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"price"}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={"brand"}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"shipping"}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"available"}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"wood"}
                            formdata={this.state.formdata.wood}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={"frets"}
                            formdata={this.state.formdata.frets}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={"publish"}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">Please check your data</div>
                        ) : null}
                        <button type="submit" onClick={(event) => this.submitForm(event)}>
                            Add product
                        </button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

export default connect(mapStateToProps)(AddProduct);
