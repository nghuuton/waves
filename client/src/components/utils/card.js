import React, { Component } from "react";

class Card extends Component {
    renderCardImage = (image) => {
        if (image.length > 0) {
            return image[0].url;
        } else {
            return "/images/image_not_availble.png";
        }
    };
    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(props.image)}) no-repeat`,
                    }}
                ></div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{props.brand.name}</div>
                        <div className="name">{props.name}</div>
                        <div className="name">${props.price}</div>
                    </div>
                </div>
                {props.grid ? <div className="description">asdsad</div> : null}
                <div></div>
            </div>
        );
    }
}

export default Card;
