import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const DeleteItem = (props) => {
  const deleteItem = (e) => {
    e.preventDefault();
    let list = props.list;
    list.splice(props.idx, 1);
    props.updateList(list);
  };

  return (
    <div>
      <button onClick={deleteItem}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default DeleteItem;
