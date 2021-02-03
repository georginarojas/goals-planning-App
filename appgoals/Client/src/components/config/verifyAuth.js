// import React from "react";
import jwt_decode from "jwt-decode";

// ----------- Set login -----------------//
export const login = (props, token, auth, user) => {
  // console.log("VERIFY Login ", token, auth, user, props);
  if (auth) {
    localStorage.setItem("JWT", token);
    localStorage.setItem("Auth", auth);
    localStorage.setItem("User", JSON.stringify(user));
    props.setContext({
      auth: auth,
      user: user,
    });
    let id = user._id;
    props.history.push(`/home/${id}`);
    // props.history.push("/home/" +id);
    return true;
  } else {
    props.props.setContext({ auth: false, user: null });
    props.history.push("/login");
    return false;
  }
};

// ----------- Confirm login -----------------//
export const isLogin = (props) => {
  const jwt = localStorage.getItem("JWT");
  console.log(">>> Is login ", props);

  if (jwt !== null) {
    const decodedJwt = jwt_decode(jwt);
    let currrentDate = new Date();
    if (decodedJwt.exp * 1000 < currrentDate.getTime()) {
      sessionExpired(props);
      return false;
    } else {
      // console.log("VERIFy isLogin ", true);
      return true;
    }
  } else {
    // console.log("VERIFy isLogin null ");

    sessionExpired(props);
    return false;
  }
};

// ----------- Session expired ------------//
export const sessionExpired = (props) => {
  localStorage.clear();
  let message = "Session expired";
  if (props !== null) {
    // console.log(">>> Session expired ", props);
    props.setContext({ auth: false, user: null });
    props.history.push("/login");
  }
  return message;
};

// ----------- Set logout ------------//
export const logout = (props) => {
  // console.log("Logout");
  localStorage.clear();
  props.history.push("/");
  let message = "Logout success";
  return message;
};

// ----------- IntervalTime variables ------------//
export const intervalTime = () => {
  let oneMinute = 1000 * 60, // milliseconds
    minutes = 120;

  let time = oneMinute * minutes + 1000;
  return time;
};

// ----------- Set Context ------------//
export const setContextAuth = (props) => {
  console.log("SET CONTEXT AUTH ", props);
  if (props !== null) {
    let auth = localStorage.getItem("Auth"),
      user = JSON.parse(localStorage.getItem("User"));
    props.setContext({
      auth: auth,
      user: user,
    });
  }
  return true;
};
