import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const GoButton= (props) =>{
    const url = props.url;
    return(
        <div>
            <Link to={url}>
                <FontAwesomeIcon icon={faArrowRight} color="black" />
            </Link>
        </div>
    );
}

export default GoButton;