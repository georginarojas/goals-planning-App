import React, { Component } from "react";
// import api from "../../services/api";
import Header from "../../utils/header";
import { Link, withRouter } from "react-router-dom";

import VerifyAuth from "../../components/config/verifyAuth";
import Logout from "../../components/config/logout";

class HomeProfile extends Component {
  // async componentDidMount() {
  //   const auth = localStorage.getItem("Auth");
  //   console.log("Home AUTH ", auth);
  //   if (!auth) {
  //     this.props.history.push("/login");
  //   }

  //   const jwt = localStorage.getItem("JWT");
  //   // console.log("Home ", jwt);
  //   const user = JSON.parse(localStorage.getItem("User"));
  //   console.log("Home: ", user);

  //   if (jwt === null) {
  //     this.props.setContext({ auth: false, user: null });
  //   } else {
  //     try {
  //       const userId = user._id;
  //       const response = await api.get("/findUser", {
  //         params: { userId },
  //         headers: { Authorization: `JWT ${jwt}` },
  //       });

  //       localStorage.setItem("Auth", response.data.auth);
  //       this.props.setContext({
  //         auth: response.data.auth,
  //         user: response.data.data,
  //       });
  //     } catch (error) {
  //       console.log("Home error ", error);
  //       this.props.setContext({ auth: false, user: null });
  //       localStorage.clear();
  //     }
  //   }
  // }

  render() {
    console.log("HOME props", this.props);
    return (
      <div className="home">
        <Header />
        <br />
        <p>Home Profile</p>

        <VerifyAuth props={this.props} />


        <Link to="/profile">Data user</Link>

        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

export default withRouter(HomeProfile);
