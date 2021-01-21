import React, { Component } from "react";

class AddItem extends Component {
  onInputEnter(e) {
    if (e.key === "Enter") {
      let item = e.target.value;
      this.props.addNewItem(item);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="New item"
          onKeyPress={this.onInputEnter.bind(this)}
          required
        />
      </div>
    );
  }
}
export default AddItem;
