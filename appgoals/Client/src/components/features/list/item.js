import React, { Component } from "react";

import DeleteItem from "./deleteItem";
import CheckButton from "../../utils/checkBtn";
import PriorityBtn from "../../utils/priorityBtn";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdtiItem: false,
    };
    this.toggleEditItem = this.toggleEditItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEditItem(e) {
    e.preventDefault();
    console.log("edit ");
    this.setState({ isEdtiItem: true });
    e.stopPropagation();
  }

  handleChange(e) {
    // e.preventDefault();
    if (e.key === "Enter") {
      let value = e.target.value;
      console.log(" Value ", value);
      let list = this.props.list,
        idx = this.props.idx;

      list[idx].item = value;
      console.log("LIST EDIT ITEM ", list);
      this.props.updateList(list);
      this.setState({ isEdtiItem: false });
    }
  }

  markDone = () => {
    let currentItem = this.props.item;
    this.props.completeItem(currentItem);
  };

  render() {
    const { completed, item } = this.props.item;
    const { isEdtiItem } = this.state;
    console.log("isEdit ", isEdtiItem);
    return (
      <li>
        <div>
          <span onClick={this.markDone}>
            <CheckButton isCheck={completed} />
          </span>
          <span onClick={this.toggleEditItem}>
            {isEdtiItem ? (
              <input
                type="text"
                placeholder="new item"
                name={"editItem"+this.props.idx}
                onKeyPress={this.handleChange}
                autoFocus
                required
              />
            ) : (
              <p>{item}</p>
            )}
          </span>
        </div>

        <DeleteItem
          item={this.props.item}
          list={this.props.list}
          idx={this.props.idx}
          updateList={this.props.updateList}
        />
        <PriorityBtn
          item={this.props.item}
          list={this.props.list}
          idx={this.props.idx}
          updateList={this.props.updateList}
        />
      </li>
    );
  }
}

//-------------------------

// const Item = (props) => {
//   const markDone = () => {
//     let currentItem = props.item;
//     props.completeItem(currentItem);
//   };

//   let name = props.item.item,
//     isCompleted = props.item.completed;
//   return (
//     <li>
//       <div>
//         <span onClick={markDone}>
//           <CheckButton isCheck={isCompleted} />
//         </span>
//         <span>
//           <p>{name}</p>
//         </span>
//       </div>

//       <DeleteItem
//         item={props.item}
//         list={props.list}
//         idx={props.idx}
//         updateList={props.updateList}
//       />
//       <PriorityBtn
//         item={props.item}
//         list={props.list}
//         idx={props.idx}
//         updateList={props.updateList}
//       />
//     </li>
//   );
// };

export default Item;
