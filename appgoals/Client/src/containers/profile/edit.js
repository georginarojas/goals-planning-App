import React, { Component } from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import VerifyAuth from "../../components/config/verifyAuth";
import Header from "../../utils/header";
import Logout from "../../components/config/logout";
import InputProfile from "../../components/profile/input";
import SelectRegister from "../../components/profile/select";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      birthdate: null,
      gender: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  handleData(event) {
    event.preventDefault();
    console.log("======= EDIT data ");
    if (this.state.name === "") {
      console.log("======= EDIt name ", this.props.user.name);
      this.setState({ name: this.props.user.name });
    }
    if (this.state.birthdate === null) {
      console.log("======= EDIT birthdate ", this.props.user.birthdate);
      this.setState({ birthdate: this.props.user.birthdate });
    }
    if (this.state.gender === null) {
      console.log("======= EDIT gender ", this.props.user.gender);
      this.setState({ gender: this.props.user.gender });
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  async handleSubmit(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("User"));
    if (user !== null) {
      var id = user._id;
      // console.log("EDIT ", id);
    }
    // this.handleChange(event);
    // console.log("EDIT ", this.state.name);
    if (this.state.name !== "") {
      try {
        const response = await api.put(`/user/${id}`, {
          name: this.state.name,
          birthdate: this.state.birthdate,
          gender: this.state.gender,
        });
        if (response.data !== null) {
          const message = response.data.message;
          this.showMessageSuccess(message);
          console.log("EDIT user updated ", response.data);
        } else {
          const message = response.data.message;
          this.showMessageWarn(message);
          console.log("EDIT fail ", response.data.message);
        }
      } catch (error) {
        console.log("EDIT error ", error);
        let message = "Error: Server failed ";
        this.showMessageError(message);
      }
    } else {
      const message = "Sorry, It was not possible to update";
      this.showMessageWarn(message);
      console.log("EDIT: ", message);
    }
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

  showMessageWarn = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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

  render() {
    const { name, birthdate, gender } = this.state;
    console.log("EDIT ", name, birthdate, gender);
    return (
      <div className="edit-profile">
        <Header />
        <VerifyAuth props={this.props} />

        <div>
          <form action="edit-user" method="put" onSubmit={this.handleSubmit}>
            <h1>Edit profile</h1>
            <InputProfile
              id={"name"}
              type={"text"}
              name={"name"}
              placeholder={this.props.user.name}
              onChange={this.handleChange}
              disabled={false}
              onBlur={this.handleData}
            />
            <InputProfile
              id={"username"}
              type={"text"}
              name={"username"}
              placeholder={this.props.user.username}
              disabled={true}
            />
            <InputProfile
              id={"email"}
              type={"text"}
              name={"email"}
              placeholder={this.props.user.email}
              disabled={true}
            />
            <InputProfile
              id={"birthdate"}
              type={"date"}
              name={"birthdate"}
              placeholder={this.props.user.birthdate}
              onChange={this.handleChange}
              disabled={false}
              onBlur={this.handleData}
            />
            <SelectRegister
              id={"gender"}
              name={"gender"}
              placeholder={this.props.user.gender}
              onChange={this.handleChange}
              disabled={false}
              onBlur={this.handleData}
            />
            <div>
              <button type="submit" className="primary-button">
                Update
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
        </div>

        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
