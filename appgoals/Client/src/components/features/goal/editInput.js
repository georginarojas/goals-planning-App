import React, { Component } from "react";

import UpdateGoal from "./updateGoal";

class EditInputGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
    };
    this.toggleChange = this.toggleChange.bind(this);
  }
  toggleChange(e) {
    e.preventDefault();
    this.setState({ isChange: !this.state.isChange });
    e.stopPropagation();
  }

  render() {
    const { isChange } = this.state;
    return (
      <div>
        <a onClick={this.toggleChange}>EditTitle</a>
        {isChange ? (
          <UpdateGoal
            id={this.props.id}
            updateTitle={this.props.updateTitle}
            toggle={this.toggleChange}
          />
        ) : null}
      </div>
    );
  }
}
export default EditInputGoal;
