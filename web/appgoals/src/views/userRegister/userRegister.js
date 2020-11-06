import React, { Component } from "react";
import './form.css';


class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      age: null,
      password: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert(`New user ${this.state.username}  created with success `);
    event.preventDefault();
  }

  render() {
    return (
      <form action="save-user" method="post" onSubmit={this.handleSubmit}>
        <p>Please enter the next data:</p>
        <div className="input-block">
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            name="username" required
            placeholder="Name"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="input-block">
          <input id="age" type="text" name="age" placeholder="Age" required/>
        </div>
        <div className="input-block">
          <input
            id="password"
            type="text"
            name="password" required
            placeholder="Password"
          />
        </div>
        <div>
         <button type="submit" className="primary-button">Confirm</button>
        </div>
      </form>
    );
  }
}

export default UserForm;
