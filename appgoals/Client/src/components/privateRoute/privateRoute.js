import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../config/verifyAuth";
import ProfileContext from "../context/profileContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <ProfileContext.Consumer>
    {({ setContext }) => (
      <Route
        render={(props) =>
          isLogin(null) ? <Component {...props} setContext={setContext}/> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </ProfileContext.Consumer>
);


export default PrivateRoute;
