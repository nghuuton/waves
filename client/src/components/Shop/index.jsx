import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { connect } from "react-redux";
import { getBrands, getWoods, getProductsToShop } from "../../actions/products_actions";

import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";
import { frets, prices } from "../utils/Form/fixed_categories";
import LoadMoreCard from "./loadMoreCards";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

class Shop extends Component {
    state = {
        grid: "",
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: [],
        },
    };
    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());
        this.props.dispatch(
            getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
        );
    }

    handleFilters = (filters, category) => {
        const newFilters = { ...this.state.filters };
        if (category === "price") {
            const newPrices = prices.find((i) => i._id === parseInt(filters, 10));
            newFilters[category] = newPrices.array;
        } else {
            newFilters[category] = filters;
        }
        this.showFilteredResults(newFilters);
        this.setState({
            filters: newFilters,
        });
    };

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(0, this.state.limit, filters)).then(() => {
            this.setState({
                skip: 0,
            });
        });
    };

    loadMoreCard = () => {
        let skip = this.state.skip + this.state.limit;
        this.props
            .dispatch(
                getProductsToShop(
                    skip,
                    this.state.limit,
                    this.state.filters,
                    this.props.products.toShop
                )
            )
            .then(() => {
                this.setState({
                    skip,
                });
            });
    };

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? "grid_bars" : "",
        });
    };

    render() {
        // console.log(this.state.filters);
        const { products } = this.props;
        return (
            <div>
                <PageTop title="Browse Products" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, "brand")
                                }
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, "frets")
                                }
                            />
                            <CollapseCheckbox
                                initState={true}
                                title="Woods"
                                list={this.props.products.woods}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, "wood")
                                }
                            />
                            <CollapseRadio
                                initState={true}
                                title="Price"
                                list={prices}
                                handleFilters={(filters) =>
                                    this.handleFilters(filters, "price")
                                }
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div
                                        className={`grid_btn ${
                                            this.state.grid ? "" : "active"
                                        } `}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </div>
                                    <div
                                        className={`grid_btn ${
                                            !this.state.grid ? "" : "active"
                                        } `}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCard
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={() => this.loadMoreCard()}
                                />
                            </div>
                        </div>
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
