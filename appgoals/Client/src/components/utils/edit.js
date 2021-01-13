import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const EditBtn= (props) =>{
    const url = props.url;
    return(
        <div>
            <Link to={url}>
                <FontAwesomeIcon icon={faPencilAlt} color="black" />
            </Link>
        </div>
    );
}

export default EditBtn;