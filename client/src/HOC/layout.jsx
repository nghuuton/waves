import React, { Component } from "react";
import Header from "../components/Header_footer/Header";
import Footer from "../components/Header_footer/Footer";

import { connect } from "react-redux";
import { getSiteData } from "../actions/site_actions";

class Layout extends Component {
    componentDidMount() {
        this.props.dispatch(getSiteData());
        console.log(this.props.site);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page_container">{this.props.children}</div>
                <Footer site={this.props.site} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        site: state.site,
    };
}

export default connect(mapStateToProps)(Layout);
