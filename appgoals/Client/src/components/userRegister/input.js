import React, { Component } from "react";
import "../../containers/userRegister/form.scss";

class InputRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPristine: true,
    };
    this.togglePristine = this.togglePristine.bind(this);
  }

  togglePristine = () => {
    this.setState({ isPristine: false });
  };

  changeStateClassName(isPristine, existData) {
    if (!isPristine && !existData) {
      return true;
    } else if (isPristine && !existData) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { isPristine } = this.state;
    const { existData, isData } = this.props;
    const flagClassNAme = this.changeStateClassName(isPristine, existData);

    return (
      <div className="input-block">
        <label>{this.props.placeholder}:</label>
        <input
          id={this.props.name}
          className={flagClassNAme ? "singup-input" : "singup-input-error"}
          type={this.props.type}
          name={this.props.name}
          required
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onClick={this.togglePristine}
          onFocus={this.togglePristine}
        />
        <label className="message-error">
          {existData ? <p>This {this.props.placeholder} exist</p> : null}
        </label>
        <label className="message-error">
          {!isPristine && !isData ? (
            <p>Invalid {this.props.placeholder}</p>
          ) : null}
        </label>
      </div>
    );
  }
}

export default InputRegister;
