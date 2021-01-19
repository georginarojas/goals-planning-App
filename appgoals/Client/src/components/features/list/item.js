import React from "react";

import DeleteItem from "./deleteItem";
import CheckButton from "../../utils/checkBtn";

const Item = (props) => {
  const markDone = () => {
    let currentItem = props.item;
    props.completeItem(currentItem);
  };

  let name = props.item.item,
    isCompleted = props.item.completed;
  return (
    <li>
      <div>
        <span onClick={markDone}>
          <CheckButton isCheck={isCompleted} />
        </span>
        <p>{name}</p>
      </div>
      <DeleteItem
        item={props.item}
        list={props.list}
        idx={props.idx}
        updateList={props.updateList}
      />
    </li>
  );
};

export default Item;
