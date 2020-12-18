import React, { Component } from "react";
import api from "../../services/api";
import Header from "../../utils/header";

class HomeProfile extends Component {
  
  async componentDidMount() {
    const jwt = localStorage.getItem("JWT");
    console.log("Home ", jwt);
    const {
      match: {
        params: { userId },
      },
    } = this.props;
    console.log("Home id ", userId);

    if (jwt === null){
        console.log("Is not loggin");
    } else{
        try{
            const response = await api.get("/findUser", {
                params: { userId,},
                headers: {Authorization: `JWT ${jwt}`},
            });
            console.log("Home user ", response.data)
        } catch (error){
            console.log("Home error ", error);
        }
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <br />
        <p>Home Profile</p>
      </div>
    );
  }
}

export default HomeProfile;
