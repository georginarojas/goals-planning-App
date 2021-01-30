import React from "react";
import jwt_decode from "jwt-decode";

export const login = (props, token, auth, user) => {
  console.log("VERIFY Login ", token, auth, user, props);
  if (auth) {
    localStorage.setItem("JWT", token);
    localStorage.setItem("Auth", auth);
    localStorage.setItem("User", JSON.stringify(user));
    props.setContext({
      auth: auth,
      user: user,
    });

    props.history.push("/home");
    return true;
  } else {
    props.props.setContext({ auth: false, user: null });
    props.history.push("/login");
    return false;
  }
};

export const isLogin = (props) => {
  const jwt = localStorage.getItem("JWT");
  if (jwt !== null) {
    const decodedJwt = jwt_decode(jwt);

    let currrentDate = new Date();
    console.log("Time expery ", decodedJwt.exp * 1000, currrentDate.getTime());
    if (decodedJwt.exp * 1000 < currrentDate.getTime()) {
      console.log("VERIFy isLogin ", false);
      sessionExpired(props);
      return false;
    } else {
      console.log("VERIFy isLogin ", true);
      return true;
    }
  } else {
    console.log("VERIFy isLogin null ");

    sessionExpired(props);
    return false;
  }
};

export const sessionExpired = (props) => {
  localStorage.clear();
  let message = "Session expired";
  if (props !== null) {
    console.log(">>> Session expired ", props);
    props.setContext({ auth: false, user: null });
    props.history.push("/login");
  }
  return message;
};

export const logout = (props) => {
  console.log("Logout");
  localStorage.clear();
  props.history.push("/");
  let message = "Logout success";
  return message;
};

export const intervalTime = () => {
  let oneMinute = 1000 * 60, // milliseconds
    minutes = 1;

  let time = oneMinute * minutes + 1000;
  return time;
};
