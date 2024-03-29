import React, { Component } from "react";
import zxcvbn from "zxcvbn";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import "./form.scss";

// Components
import InputRegister from "../../components/userRegister/input";
import SelectRegister from "../../components/userRegister/select";
import PasswordRegister from "../../components/userRegister/password";

class UserRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      birthdate: null,
      gender: "none",
      password: null,
      passwordConfirm: null,

      scorePassword: null,
      isValidPassword: false,
      isSamePassword: false,
      isValidUsername: false,
      isEmail: false,
      existUsername: false,
      existEmail: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async fetchData(field, value) {
    try {
      const response = await api.get(
        `/user/search?search_field=${field}&search_value=${value}`
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

  async checkUsername(event) {
    event.preventDefault();
    const username = this.state.username;
    const field = "username";
    if (username.length !== 0 && (username.indexOf("@") === -1)) {
      this.setState({isValidUsername: true});
      const response = await this.fetchData(field, username);
      if (!response.error) {
        if (response.data.length === 0) {
          this.setState({ existUsername: false });
        } else {
          this.setState({ existUsername: true });
        }
      } else {
        let message = "Error: Server failed ";
        this.showToast(message, toast.TYPE.ERROR);
        console.log("deu erro", response);
      }
    } else{
      this.setState({isValidUsername: false});
    }
  }

  async checkEmail(event) {
    event.preventDefault();
    const email = this.state.email;
    const field = "email";
    const response = await this.fetchData(field, email);

    if (!response.error) {
      if (response.data.length === 0) {
        this.setState({ existEmail: false });
      } else {
        this.setState({ existEmail: true });
      }
    } else {
      let message = "Error: Server failed ";
      this.showToast(message, toast.TYPE.ERROR);
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });

    if (name === "password") {
      const scorePassword = zxcvbn(value, [this.state.username]);
      this.setState({ scorePassword: scorePassword.score });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let { isSamePassword, isEmail, isValidPassword, isValidUsername } = this.state;
    if (isSamePassword && isEmail && isValidPassword && isValidUsername) {
      try {
        const response = await api.post("/user", {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          birthdate: this.state.birthdate,
          gender: this.state.gender,
          password: this.state.password,
        });
        if (response.data === null) {
          let message = `Error: Was not possible to make the register, ${this.state.username} or ${this.state.email} exist`;
          this.showToast(message, toast.TYPE.ERROR);
        } else {
          let message = "User was create with success";
          this.showToast(message, toast.TYPE.SUCCESS);
          this.resetForm(event);
        }
      } catch (error) {
        console.log(error);
        let message = "Error: Server failed ";
        this.showToast(message, toast.TYPE.ERROR);
      }
    } else {
      let message = `Error: please check the data are correct`;
      this.showToast(message, toast.TYPE.ERROR);
      return {
        error: true,
      };
    }
  }

  validatePassword(event) {
    event.preventDefault();
    if (this.state.scorePassword >= 2) {
      this.setState({ isValidPassword: true });
    } else {
      this.setState({ isValidPassword: false });
    }
  }

  comparePassword(event) {
    event.preventDefault();
    if (this.state.passwordConfirm !== null) {
      if (this.state.passwordConfirm === this.state.password) {
        this.setState({ isSamePassword: true });
      } else {
        this.setState({ isSamePassword: false });
        let message = `Passwords don't match`;
        this.showToast(message, toast.TYPE.WARNING);
      }
    } else {
      let message = "Please confirm the password";
      this.showToast(message, toast.TYPE.WARNING);
    }
  }

  async validateEmail(event) {
    event.preventDefault();
    const email = this.state.email;

    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length !== 0) {
      if (re.test(email)) {
        this.setState({ email: this.state.email });
        this.setState({ isEmail: true });
        await this.checkEmail(event);
      } else {
        this.setState({ isEmail: false });
        this.setState({ existEmail: false });
      }
    }
  }

  showToast = (message, type) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type
    });
  };
  

  resetForm(event) {
    event.preventDefault();
    event.target.reset();
    this.setState({
      name: "",
      username: "",
      email: "",
      birthdate: "",
      gender: "",
      password: "",
      passwordConfirm: "",
      scorePassword: "",
    });
  }

  render() {
    const {
      password,
      existUsername,
      isEmail,
      existEmail,
      isValidPassword,
      isSamePassword,
      isValidUsername,
    } = this.state;

    return (
      <form action="save-user" method="post" onSubmit={this.handleSubmit}>
        <div className="input-block">
          <h2 className="tittle-form">Register new user </h2>
          <br/>
          <p>Please enter the next data:</p>
        </div>

        <InputRegister
          id={"name"}
          type={"text"}
          name={"name"}
          placeholder={"Name"}
          onChange={this.handleChange}
          existData={false}
          isData={true}
        />

        <InputRegister
          id={"username"}
          type={"text"}
          name={"username"}
          placeholder={"User name"}
          onChange={this.handleChange}
          onBlur={this.checkUsername}
          existData={existUsername}
          isData={isValidUsername}
        />

        <InputRegister
          id={"email"}
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          onChange={this.handleChange}
          onBlur={this.validateEmail}
          existData={existEmail}
          isData={isEmail}
        />

        <InputRegister
          id={"birthdate"}
          type={"date"}
          name={"birthdate"}
          placeholder={"Brithdate"}
          onChange={this.handleChange}
          existData={false}
          isData={true}
        />

        <SelectRegister
          id={"gender"}
          name={"gender"}
          placeholder={"Gender"}
          onChange={this.handleChange}
        />

        <PasswordRegister
          id={"password"}
          name={"password"}
          placeholder={"Password"}
          onChange={this.handleChange}
          onBlur={this.validatePassword}
          password={password}
          isValidData={isValidPassword}
        />

        <PasswordRegister
          id={"passwordConfirm"}
          name={"passwordConfirm"}
          placeholder={"Password confirm"}
          onChange={this.handleChange}
          onBlur={this.comparePassword}
          isValidData={isSamePassword}
        />

        <div>
          <button type="submit" className="primary-button">
            Sing up
          </button>
        </div>
        <div className="message-toast">
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

export default UserRegisterForm;
