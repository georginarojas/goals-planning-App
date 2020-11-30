import React, { Component } from "react";
import "../../containers/userRegister/form.scss";
import "./select.css";

class SelectRegister extends Component{
    render() {
        return (
            <div className="input-block">
              <label>{this.props.placeholder}:</label>
              <select id={this.props.name} name={this.props.name} onChange={this.props.onChange}>
                <option value="none">None</option>
                <option value="female">Female</option>
                <option value="male">Male</option> 
              </select>
          </div>
  
        )
    }
}

export default SelectRegister;