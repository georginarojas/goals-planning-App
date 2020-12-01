import React, { Component } from "react";
import zxcvbn from "zxcvbn";
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
    this.clearForm = this.clearForm.bind(this);
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
    console.log("User name value ", username);
    if (username.length !== 0) {
      const response = await this.fetchData(field, username);
      console.log(response.data);
      if (!response.error) {
        if (response.data.length === 0) {
          console.log("não tem esse nome de fdp", response.data.length);
          this.setState({ existUsername: false });
        } else {
          console.log("encontramos um fdp com esse nome");
          this.setState({ existUsername: true });
        }
      } else {
        console.log("deu erro");
      }
    }
  }

  async checkEmail(event) {
    event.preventDefault();
    const email = this.state.email;
    const field = "email";
    const response = await this.fetchData(field, email);

    if (!response.error) {
      if (response.data.length === 0) {
        console.log("This email don't exist is OK");
        this.setState({ existEmail: false });
      } else {
        console.log("This email exist WRONG");
        this.setState({ existEmail: true });
      }
    } else {
      console.log("ERROR");
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });

    // console.log(`CHANGE name: ${name},  value: ${value}`);

    if (name === "password") {
      const scorePassword = zxcvbn(value, [this.state.username]);
      // console.log("scorePassword Obj ", scorePassword);
      this.setState({ scorePassword: scorePassword.score });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let { isSamePassword, isEmail, isValidPassword } = this.state;
    // console.log(isSamePassword, isEmail, isValidPassword);
    if (isSamePassword && isEmail && isValidPassword) {
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
          alert("Was not possible to make the register, this user exits");
        } else {
          alert(`User ${response.data.name} was created with success`);
          console.log(response.data);
          // event.target.reset();
          this.clearForm(event);
        }
      } catch (error) {
        alert("Was not possible to make the register");
        console.log(error);
      }
    } else {
      alert("Was not possible to make the register, different password");
      return {
        error: true,
      };
    }
  }

  validatePassword(event) {
    event.preventDefault();
    if (this.state.scorePassword >= 2) {
      this.setState({ isValidPassword: true });
      console.log("Valid password");
    } else {
      this.setState({ isValidPassword: false });
      console.log("Invalid password");
    }
  }

  comparePassword(event) {
    event.preventDefault();
    if (this.state.passwordConfirm !== null) {
      if (this.state.passwordConfirm === this.state.password) {
        this.setState({ isSamePassword: true });
      } else {
        this.setState({ isSamePassword: false });
        alert(
          `The passwords: "${this.state.password}" and "${this.state.passwordConfirm}" are not equals`
        );
      }
    } else {
      alert("Please confirm the password");
    }
  }

  async validateEmail(event) {
    event.preventDefault();
    const email = this.state.email;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length !== 0) {
      if (re.test(email)) {
        this.setState({ email: this.state.email });
        this.setState({ isEmail: true });
        const response = await this.checkEmail(event);
        console.log(">>>>>> ", this.state.isEmail);
      } else {
        this.setState({ isEmail: false });
        console.log(">>>>>> ", this.state.isEmail);
      }
    }
  }

  clearForm(event){
    event.preventDefault();
    event.target.reset();
    this.setState({
      name: '',
      username: '',
      email: '',
      birthdate: '',
      gender: '',
      password: '',
    })
  }

  render() {
    const {
      password,
      existUsername,
      isEmail,
      existEmail,
      isValidPassword,
      isSamePassword,
    } = this.state;

    console.log(`Valid ${isValidPassword} Same ${isSamePassword}`);

    return (
      <form action="save-user" method="post" onSubmit={this.handleSubmit}>
        <div className="input-block">
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
          isData={true}
        />

        <InputRegister
          id={"email"}
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          // className={this.isEmail ? 'singup-input': 'singup-input-error'}
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

        < SelectRegister 
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
      </form>
    );
  }
}

export default UserRegisterForm;
