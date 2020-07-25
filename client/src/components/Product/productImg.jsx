import React, { Component } from "react";

class ProductImg extends Component {
    state = {
        lightBox: false,
        imagePos: 0,
        lightBoxImages: [],
    };

    componentDidMount() {
        if (this.props.detail.images.length > 0) {
            let lightBoxImages = [];
            this.props.detail.images.forEach((item) => {
                lightBoxImages.push(item.url);
            });
            this.setState({
                lightBoxImages,
            });
        }
    }

    renderCardImage = (images) => {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return `/images/image_not_availble.png`;
        }
    };

    showThumbs = (detail) =>
        this.state.lightBoxImages.map((item, i) =>
            i > 0 ? (
                <div
                    key={i}
                    onClick={() => this.handleLightBox(i)}
                    className="thumb"
                    style={{ background: `url(${item}) no-repeat` }}
                ></div>
            ) : null
        );

    handleLightBox = () => {};

    render() {
        const { detail } = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{
                            background: `url(${this.renderCardImage(
                                detail.images
                            )}) no-repeat`,
                        }}
                        onClick={() => this.handleLightBox(0)}
                    ></div>
                </div>
                <div className="main_thumbs">{this.showThumbs(detail.images)}</div>
            </div>
        );
    }
}

export default ProductImg;
