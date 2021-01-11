import React, { Component } from "react";
import "../../containers/userRegister/form.scss";
import "../userRegister/select.css";

class SelectRegister extends Component {
  render() {
    return (
      <div className="input-block">
        <label>{this.props.name}:</label>
        <select
          id={this.props.name}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        >
          <option value={this.props.placeholder}>
            {this.props.placeholder}
          </option>
          <option value="none">None</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
    );
  }
}

export default SelectRegister;
