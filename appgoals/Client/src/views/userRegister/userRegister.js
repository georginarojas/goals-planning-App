import React, { Component } from "react";
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

import PasswordStrengthMeter from "../../components/passwordStrengthMeter";
import api from "../../services/api";

import "./form.css";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      age: null,
      password: null,
      passwordConf: null,

      isRevealPassword: false,
      isSamePassword: false

    };

    this.handleChange = this.handleChange.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.comparePassword = this.comparePassword.bind(this);

    this.passwordOneRef = React.createRef();
    this.passwordTwoRef = React.createRef();
    this.iconRevealPasswordRef = React.createRef();
   
  }

  async fetchUsername(username) {
    try {
      const response = await api.get(`/username/${username}`);
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
    console.log(this.state.username);
    const username= this.state.username;
    const response = await this.fetchUsername(username);
    if(!response.error) {
      if (response.data === null) {
        console.log("não tem esse nome de fdp");
      } else {
        console.log("encontramos um fdp com esse nome");
      }
    } else {
      console.log("deu erro");
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("Submit " + this.state.isSamePassword);
    if (this.state.isSamePassword === true) {
      try {
        const response = await api.post("/user", {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          age: this.state.age,
          password: this.state.password,
        });
        if(response.data === null){
          alert("Was not possible to make the register, this user exits");
        } else {
          alert(`User ${response.data.name} was created with success`)
          console.log(response.data);
        }

      } catch (error) {
        alert("Was not possible to make the register");
        console.log(error);
      }
    } else {
      alert("Was not possible to make the register, different password");
      return {
       error: true
      };
    }
  }

  comparePassword(event){
    event.preventDefault();
    if(this.state.passwordConf !== null) {
      if (this.state.passwordConf === this.state.password) {
        this.setState({isSamePassword: !this.state.isSamePassword});
      } else {
        alert(`The passwords: "${this.state.password}" and "${this.state.passwordConf}" are not equals`);
      }
    } else {
      alert("Please confirm the password");
    }
    
  }

  togglePassword = event => {
    this.setState({isRevealPassword: !this.state.isRevealPassword});
  }

  render() {
    const { password, isRevealPassword} = this.state;

    return (
      <form action="save-user" method="post" onSubmit={this.handleSubmit}>
        <div className="input-block">
          <p>Please enter the next data:</p>
        </div>
        <div className="input-block">
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Name"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-block">
          <input
            id="username"
            type="text"
            name="username"
            required
            placeholder="User name"
            onChange={this.handleChange}
            onBlur={this.checkUsername}
          />
        </div>
        <div className="input-block">
          <input 
          id="email"
          type="text"
          name="email"
          required
          placeholder="E-mail"
          onChange={this.handleChange}
          />
        </div>
        <div className="input-block">
          <input
            id="age"
            type="text"
            name="age"
            required
            placeholder="Age"
            onChange={this.handleChange}
          />
        </div>
        <div className="input-block">
          <input
            id="password"
            type={isRevealPassword? "text": "password"}
            name="password"
            required
            autoComplete="off"
            placeholder="Password"
            onChange={this.handleChange}
            ref={this.passwordOneRef}
          />
          <span onClick={this.togglePassword} ref={this.iconRevealPasswordRef} className="customIcon"> 
              {
              isRevealPassword? 
              <FontAwesomeIcon icon={faEye} /> : 
              <FontAwesomeIcon icon={faEyeSlash}/>
              }
          </span>

          {
            //password != null ? <Password password={password} /> : null
            password && <PasswordStrengthMeter password={password} />
          }

        </div>
        <div className="input-block">
          <input
            id="passwordConf"
            type={isRevealPassword? "text" : "password"}
            name="passwordConf"
            required
            autoComplete="off"
            placeholder="Confirm password"
            onChange={this.handleChange}
            onBlur={this.comparePassword}            
          />
          {/* <span onClick={this.togglePassword} ref={this.iconRevealPasswordRef} className="customIcon"> 
              {
              isRevealPassword? 
              <FontAwesomeIcon icon={faEye} /> : 
              <FontAwesomeIcon icon={faEyeSlash}/>
              }
          </span> */}
        </div>
        <div>
          <button type="submit" className="primary-button">
            Sing up
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm;
