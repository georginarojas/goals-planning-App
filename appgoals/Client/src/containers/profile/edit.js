import React, { Component } from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import VerifyAuth from "../../components/config/verifyAuth";
import Header from "../../utils/header";
import Logout from "../../components/config/logout";
import GoHome from "../../components/config/goHome";
import GoBack from "../../components/config/goBack";
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
    if (this.state.name === "") {
      this.setState({ name: this.props.user.name });
    }
    if (this.state.birthdate === null) {
      this.setState({ birthdate: this.props.user.birthdate });
    }
    if (this.state.gender === null) {
      this.setState({ gender: this.props.user.gender });
    }
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("User"));
    if (user !== null) {
      var id = user._id;
    }
    if (this.state.name !== "") {
      try {
        const response = await api.put(`/user/${id}`, {
          name: this.state.name,
          birthdate: this.state.birthdate,
          gender: this.state.gender,
        });
        if (response.data !== null) {
          const message = response.data.message;
          this.showToast(message, toast.TYPE.SUCCESS);
          // console.log("EDIT user updated ", response.data);
        } else {
          const message = response.data.message;
          this.showToast(message, toast.TYPE.WARNING);
        }
      } catch (error) {
        // console.log("EDIT error ", error);
        let message = "Error: Server failed ";
        this.showToast(message, toast.TYPE.ERROR);
      }
    } else {
      const message = "Sorry, It was not possible to update";
      this.showToast(message, toast.TYPE.WARNING);
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
      type,
    });
  };

  render() {
    // const { name, birthdate, gender } = this.state;

    return (
      <div className="edit-profile">
        <Header />
        <VerifyAuth props={this.props} />

        <div>
          <form action="edit-user" method="put" onSubmit={this.handleSubmit}>
            <h1>Edit profile</h1>
            <InputProfile
              className={"singup-input"}
              id={"name"}
              type={"text"}
              name={"name"}
              placeholder={this.props.user.name}
              onChange={this.handleChange}
              disabled={false}
              onBlur={this.handleData}
            />
            <InputProfile
              className={"input-blocked"}
              id={"username"}
              type={"text"}
              name={"username"}
              placeholder={this.props.user.username}
              disabled={true}
            />
            <InputProfile
              className={"input-blocked"}
              id={"email"}
              type={"text"}
              name={"email"}
              placeholder={this.props.user.email}
              disabled={true}
            />
            <InputProfile
              className={"singup-input"}
              id={"birthdate"}
              type={"date"}
              name={"birthdate"}
              placeholder={this.props.user.birthdate}
              onChange={this.handleChange}
              disabled={false}
              onBlur={this.handleData}
            />
            <SelectRegister
              className={"singup-input"}
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
        <div>
          <GoHome />
        </div>
        <div>
          <GoBack />
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
