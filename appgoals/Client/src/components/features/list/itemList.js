import React from "react";

import Item from "./item";

const ItemsList = (props) => {
  let list = props.items;

  const listItem = list.map((item, i) => {
    return (
      <Item
        item={item}
        key={i}
        list={list}
        idx={i}
        updateList={props.updateList}
        completeItem={props.completeItem}
      />
    );
  });
  return (
    <div>
      <ul>{listItem}</ul>
    </div>
  );
};

export default ItemsList;
