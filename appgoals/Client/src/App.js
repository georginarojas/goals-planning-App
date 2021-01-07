import { Switch, Route } from "react-router-dom";

import "./utils/css/main.css";

import "./utils/css/button.css";

import Home from "./containers/wellcome-Test";
import UserRegisterForm from "./containers/userRegister/form";
import UserLogin from "./containers/login/login";
import HomeProfile from "./containers/profile/home";
import ConfigProfile from "./containers/profile/configProfile";
import ProfileContext from "./components/context/profileContext";

import ContextProvider from "./components/context/contextProvider";

const App = (props) => (
  <div className="App">
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/register" component={UserRegisterForm} />

      <ContextProvider>
        <ProfileContext.Consumer>
          {({ auth, setContext }) => (
            <Route
              path="/login"
              render={(props) => (
                <UserLogin auth={auth} setContext={setContext}></UserLogin>
              )}
            />
          )}
        </ProfileContext.Consumer>

        <ProfileContext.Consumer>
          {({ user, auth, setContext }) => (
            <Route
              path="/config"
              render={(props) => (
                <ConfigProfile
                  auth={auth}
                  user={user}
                  setContext={setContext}
                ></ConfigProfile>
              )}
            />
          )}
        </ProfileContext.Consumer>

        <ProfileContext.Consumer>
          {({ setContext, auth }) => (
            <Route
              path="/profile"
              render={(props) => (
                <HomeProfile auth={auth} setContext={setContext}></HomeProfile>
              )}
            />
          )}
        </ProfileContext.Consumer>

      </ContextProvider>

      <Route component={Error} />
      {props.children}
    </Switch>
  </div>
);

export default App;
