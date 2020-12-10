import React, { Component } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputLogin from "../../components/login/input";
import "../userRegister/form.scss";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      password: null,
      isValidData: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(value1, password) {
    try {
      const response = await api.post("/signin", {
        username: value1,
        password: password,
      });

      return {
        error: false,
      };
    } catch (error) {
      return {
        error: true,
      };
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const value1 = this.state.data;
    const value2 = this.state.password;
    const response = await this.fetchData(value1, value2);
    console.log("error ", response.error);
    if (response.error) {
      this.setState({ isValidData: false });
      let message = "Error: password or user not valid";
      this.showMessageError(message);
    } else {
      this.setState({ isValidData: true });
      let message = "Success";
      this.showMessageSuccess(message);
    }
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
    const { isValidData } = this.state;
    return (
      <form
        action="authentication-user"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <div className="input-block">
          <p>Please enter the next data:</p>
        </div>

        <InputLogin
          id={"data"}
          type={"text"}
          name={"data"}
          placeholder={"Username or E-mail"}
          onChange={this.handleChange}
          isValidData={isValidData}
        />

        <InputLogin
          id={"password"}
          name={"password"}
          placeholder={"Password"}
          onChange={this.handleChange}
          isValidData={isValidData}
        />

        <div >
          <br />
          <label className="message-error">
            {!isValidData ? <p>User or password incorrect</p> : null}
          </label>
        </div>

        <div>
          <button type="submit" className="primary-button">
            Login
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

export default UserLogin;
