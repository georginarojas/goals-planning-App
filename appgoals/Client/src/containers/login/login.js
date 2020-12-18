import React, { Component } from "react";
import api from "../../services/api";
import { Redirect } from "react-router-dom";

import InputLogin from "../../components/login/input";
import "../userRegister/form.scss";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      password: null,
      isValidData: true,
      isAuth: false,
      userId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clean = this.clean.bind(this);
  }

  async fetchData(value1, password) {
    try {
      const response = await api.post("/login", {
        username: value1,
        password: password,
      });
      console.log("RESPONSE ", response);
      localStorage.setItem("JWT", response.data.token);
      return {
        error: false,
        data: response.data.id,
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
    if (response.error) {
      this.setState({ isValidData: false, isAuth: false });
      this.clean(event);
    } else {
      this.setState({ isValidData: true, isAuth: true, userId: response.data });
    }
  }

  clean(event) {
    event.preventDefault();
    event.target.reset();
    this.setState({
      data: "",
      password: "",
      userId: "",
    });
  }

  render() {
    const { isValidData, isAuth, userId } = this.state;
    console.log("ID: ", userId);

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

        <div>
          <br />
          <label className="message-error">
            {!isValidData ? <p>User or password incorrect</p> : null}
          </label>
        </div>

        <div>
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>

        <div>
          {isValidData && isAuth ? (
            // <Redirect to='/profile' /> : null
            <Redirect to={`/profile/${userId}`} />
          ) : null}
        </div>
      </form>
    );
  }
}

export default UserLogin;
