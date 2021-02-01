import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../config/verifyAuth";
import ProfileContext from "../context/profileContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <ProfileContext.Consumer>
    {({ setContext, auth, user }) => (
      <Route
        render={(props) =>
          isLogin(null) ? (
            <Component
              {...props}
              setContext={setContext}
              auth={auth}
              user={user}
            />
          ) : (
            <Redirect to="/login" />
          )
        }
        {...rest}
      />
    )}
  </ProfileContext.Consumer>
);

export default PrivateRoute;
