import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/privateRoute";

import Home from "./containers/wellcome-Test";
import UserRegisterForm from "./containers/userRegister/form";
import UserLogin from "./containers/login/login";
import HomeProfile from "./containers/profile/home";
import Profile from "./containers/profile/profile";
import EditProfile from "./containers/profile/edit";
import List from "./containers/features/list";

import ProfileContext from "./components/context/profileContext";
import ContextProvider from "./components/context/contextProvider";

import "./utils/css/main.css";
import "./utils/css/button.css";

const App = (props) => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/register" component={UserRegisterForm} />

        {/* <Route path="/login" component={UserLogin} /> */}

        <ContextProvider>

          <PrivateRoute path="/home" component={HomeProfile} />
          <PrivateRoute path="/list" component={List} />


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

          {/* <ProfileContext.Consumer>
            {({ setContext, auth }) => (
              <Route
                path="/home"
                render={(props) => (
                  <HomeProfile
                    auth={auth}
                    setContext={setContext}
                  ></HomeProfile>
                )}
              />
            )}
          </ProfileContext.Consumer> */}

          <ProfileContext.Consumer>
            {({ user, auth, setContext }) => (
              <Route
                path="/profile"
                exact
                render={(props) => (
                  <Profile
                    auth={auth}
                    user={user}
                    setContext={setContext}
                  ></Profile>
                )}
              />
            )}
          </ProfileContext.Consumer>

          <ProfileContext.Consumer>
            {({ user, auth, setContext }) => (
              <Route
                path="/profile/edit"
                exact
                render={(props) => (
                  <EditProfile
                    auth={auth}
                    user={user}
                    setContext={setContext}
                  ></EditProfile>
                )}
              />
            )}
          </ProfileContext.Consumer>

          {/* <ProfileContext.Consumer>
            {({ setContext }) => (
              <Route
                path="/list"
                exact
                render={(props) => <List setContext={setContext} />}
              />
            )}
          </ProfileContext.Consumer> */}


        </ContextProvider>

        <Route component={Error} />
        {props.children}
      </Switch>
    </Router>
  </div>
);

export default App;
