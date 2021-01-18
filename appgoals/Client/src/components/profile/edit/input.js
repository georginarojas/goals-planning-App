import React, { Component } from "react";
import "./input.css";
import "../../../containers/userRegister/form.scss";


class InputProfile extends Component {
  render() {
    return (
      <div className="input-block">
        <label>{this.props.name}:</label>
        <input
          className={this.props.className}
          id={this.props.name}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          disabled={this.props.disabled}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default InputProfile;
