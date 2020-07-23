import React from "react";
import CardBlockShop from "../utils/card_block_shop";

const LoadMoreCard = (props) => {
    return (
        <div>
            <div>
                <CardBlockShop gird={props.grid} list={props.products} />
            </div>
        </div>
    );
};

export default LoadMoreCard;
