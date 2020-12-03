import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import InputAuthentication from "../../components";

import "./authentication.css";
import "../userRegister/form.scss";

class UserAuthentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      password: null,
      isEmail: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.typeOfData = this.typeOfData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(field1, value1, field2, value2) {
    try {
      const response = await api.get(
        `/user/authentication?field1=${field1}&value1=${value1}&field2=${field2}&value2=${value2}`
      );
      return {
        error: false,
        data: response.data,
      };
    } catch (error) {
      return {
        error: true,
        data: null,
      };
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  typeOfData(event) {
    event.preventDefault();
    const data = this.state.data;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(data)) {
      this.setState({ isEmail: true });
    } else {
      this.setState({ isEmail: false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const field1 = this.state.isEmail ? "email" : "username";
    const value1 = this.state.data;
    const field2 = "password";
    const value2 = this.state.password;
    console.log(`${field1}  ${value1} ${field2}  ${value2}`);
    // const response = await this.fetchData(field1, value1, field2, value2);

    // if (!response.error) {
    //   if (response.data.length === 0) {
    //     let message = "Error: password or user not valid";
    //     this.showMessageError(message);
    //   } else {
    //     let message = "Success";
    //     this.showMessageSuccess(message);
    //   }
    // } else {
    //   let message = "Error: Server failed";
    //   this.showMessageError(message);
    // }
  }

  showMessageSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  showMessageError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    console.log("STATE ", this.state);
    console.log("email ", this.state.isEmail);
    return (
      <form
        action="authentication-user"
        method="get"
        onSubmit={this.handleSubmit}
      >
        <div className="input-block">
          <p>Please enter the next data:</p>
        </div>

        <div className="input-block">
          <input
            id="data"
            type="text"
            name="data"
            required
            placeholder="Username or E-mail"
            onChange={this.handleChange}
            onBlur={this.typeOfData}
          />
        </div>

        <div className="input-block">
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button type="submit" className="primary-button">
            Enter
          </button>
          <ToastContainer
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
          />
        </div>
      </form>
    );
  }
}

export default UserAuthentication;
