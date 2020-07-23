import React from "react";
import Card from "./card";

const CardBlock = (props) => {
    const renderCard = () =>
        props.list ? props.list.map((card, i) => <Card key={i} {...card} />) : null;
    return (
        <div className="card_block">
            <div className="container">
                {props.title ? <div className="title">{props.title}</div> : null}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {renderCard(props.list)}
            </div>
        </div>
    );
};

export default CardBlock;
