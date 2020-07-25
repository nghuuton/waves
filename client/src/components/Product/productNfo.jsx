import React from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import MyButton from "../utils/button";

const ProductNfo = (props) => {
    const detail = props.detail;
    const showProductTags = (detail) => (
        <div className="product_tags">
            {detail.shipping ? (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <div className="tag_text">
                        <div>Free shipping</div>
                        <div>And return </div>
                    </div>
                </div>
            ) : null}
            {detail.available ? (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className="tag_text">
                        <div>Available</div>
                        <div>in store</div>
                    </div>
                </div>
            ) : (
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className="tag_text">
                        <div>Not Available</div>
                        <div>Preoder only</div>
                    </div>
                </div>
            )}
        </div>
    );

    const showProductActions = (detail) => (
        <div className="product_actions">
            <div className="price">${detail.price}</div>
            <div className="cart">
                <MyButton
                    type="add_to_cart_link"
                    runAction={() => console.log("Add to cart")}
                />
            </div>
        </div>
    );
    const showProductSpecifications = (detail) => (
        <div className="product_specifications">
            <h2>Specs: </h2>
            <div>
                <div className="item">
                    <strong>Frets: </strong>
                    {detail.frets}
                </div>
                <div className="item">
                    <strong>Wood: </strong>
                    {detail.wood.name}
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <h1>
                {detail.brand.name} {detail.name}
            </h1>
            <p>{detail.description}</p>
            {showProductTags(detail)}
            {showProductActions(detail)}
            {showProductSpecifications(detail)}
        </div>
    );
};

export default ProductNfo;
