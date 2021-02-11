import React, { Component } from "react";

import UpdateMission from "./updateMission";

class EditInputMission extends Component {
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
          <UpdateMission
            updateTitle={this.props.updateTitle}
            toggleChange={this.toggleChange}
            id={this.props.id}
          />
        ) : null}
      </div>
    );
  }
}

export default EditInputMission;
