import React, { Component } from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";

import InputLogin from "../../components/login/input";
import Header from "../../components/utils/header";
import "../userRegister/form.scss";

import {login} from "../../components/config/verifyAuth";

class UserLogin extends Component {
  constructor(props) {
    super(props);

    const auth = localStorage.getItem("Auth");
    // console.log("LOGIN AUTH ", auth);
    if (auth) {
      let user = localStorage.getItem("User");
      this.props.history.push("/home/" + user._id);
    }

    this.state = {
      data: "",
      password: null,
      isValidData: true,
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
      console.log("LOGIn RESPONSE ", response);

      // localStorage.setItem("JWT", response.data.token);
      // localStorage.setItem("Auth", true);
      // localStorage.setItem("User", JSON.stringify(response.data.data));

      return {
        error: false,
        data: response.data,
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
      this.setState({ isValidData: false });
      this.clean(event);
    } else {
      this.setState({ isValidData: true, userId: response.data.data._id });
      login(this.props, response.data.token, true, response.data.data);



      // this.props.setContext({ auth: true, user: response.data.data });
      // this.props.history.push('/home');
      // this.props.history.push("/home/" + response.data.data._id);
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
    const { isValidData } = this.state;

    return (
      <div id="login">
        <Header />
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
      </form>

      </div>
    );
  }
}

export default withRouter(UserLogin);
