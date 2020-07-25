import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { connect } from "react-redux";
import { getProduct, clearProductDetails } from "../../actions/products_actions";
import ProductNfo from "./productNfo";
import ProductImg from "./productImg";

class ProductPage extends Component {
    state = {};

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProduct(id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearProductDetails());
    }

    render() {
        return (
            <div>
                <PageTop title="Product detail" />
                <div className="container">
                    {this.props.products.productDetails ? (
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{ width: "500px" }}>
                                    <ProductImg
                                        detail={this.props.products.productDetails}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <ProductNfo
                                    addCart={(id) => this.addToCartHandler(id)}
                                    detail={this.props.products.productDetails}
                                />
                            </div>
                        </div>
                    ) : (
                        "Loading"
                    )}
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

export default connect(mapStateToProps)(ProductPage);
