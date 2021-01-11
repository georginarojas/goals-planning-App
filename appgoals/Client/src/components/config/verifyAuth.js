import React, { useEffect } from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";

const VerifyAuth = (props) => {
  const auth = localStorage.getItem("Auth");
  if (!auth) {
    props.history.push("/login");
  }

  const jwt = localStorage.getItem("JWT");
  //   console.log("VERIFY  ", jwt);
  const user = JSON.parse(localStorage.getItem("User"));
  //   console.log("VERIFY : ", user);

  useEffect(() => {
    if (jwt !== null) {
      getUser();
    } else {
      props.props.setContext({ auth: false, user: null });
    }
  }, []);

  const getUser = async () => {
    console.log("VerifyAuth");
    try {
      const userId = user._id;
      const response = await api.get("/findUser", {
        params: { userId },
        headers: { Authorization: `JWT ${jwt}` },
      });
      console.log(">>>>>> VERIFY RESponse ", response);
      localStorage.setItem("Auth", response.data.auth);
      props.props.setContext({
        auth: response.data.auth,
        user: response.data.data,
      });
    } catch (error) {
      console.log("VERIFY error ", error);
      localStorage.clear();
      props.history.push("/login");
      props.props.setContext({ auth: false, user: null });
    }
  };

  // if (jwt === null) {
  // //   props.setContext({ auth: false, user: null });
  // } else {
  //   try {
  //     const userId = user._id;
  //     const response = await api.get("/findUser", {
  //       params: { userId },
  //       headers: { Authorization: `JWT ${jwt}` },
  //     });
  //     console.log(">>>>>> VERIFY ")
  //     localStorage.setItem("Auth", response.data.auth);
  //     // props.setContext({
  //     //   auth: response.data.auth,
  //     //   user: response.data.data,
  //     // });
  //   } catch (error) {
  //     console.log("Home error ", error);
  //     // props.setContext({ auth: false, user: null });
  //     localStorage.clear();
  //   }
  // }
  return <div></div>;
};

export default withRouter(VerifyAuth);
