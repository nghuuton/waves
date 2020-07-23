import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { connect } from "react-redux";
import { getBrands, getWoods } from "../../actions/products_actions";

class Shop extends Component {
    state = {};
    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
    }

    render() {
        const { products } = this.props;
        return (
            <div>
                <PageTop title="Browse Products" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">L</div>
                        <div className="right">R</div>
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

export default connect(mapStateToProps)(Shop);
