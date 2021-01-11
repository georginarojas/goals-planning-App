import React, { Component } from "react";

class InputProfile extends Component {

  render() {
    return (
      <div className="input-block">
        <label>{this.props.name}:</label>
        <input
          id={this.props.name}
          type={this.props.type}
          name={this.props.name}
          // required
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          disabled={this.props.disabled}
          
        />
      </div>
    );
  }
}

export default InputProfile;
