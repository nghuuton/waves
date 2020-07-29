import React from "react";
import FontAweSomeIcon from "@fortawesome/react-fontawesome";
import faExclamation from "@fortawesome/fontawesome-free-solid/faExclamation";

const NotFound = () => {
    return (
        <div className="container">
            <div className="not_found_container">
                <FontAweSomeIcon icon={faExclamation} />
                <div>Oops !! page not found.</div>
            </div>
        </div>
    );
};

export default NotFound;
