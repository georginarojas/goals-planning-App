import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/privateRoute";

import Home from "./containers/wellcome-Test";
import UserRegisterForm from "./containers/userRegister/form";
import UserLogin from "./containers/login/login";
import HomeProfile from "./containers/profile/home";
import Profile from "./containers/profile/profile";
import EditProfile from "./containers/profile/edit";

import Goal from "./containers/features/goal";
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

          <PrivateRoute path="/home/:id" exact component={HomeProfile} />
          <PrivateRoute path="/profile/:id" exact component={Profile} />
          <PrivateRoute
            path="/profile/:id/edit"
            exact
            component={EditProfile}
          />

          <PrivateRoute path="/goal/:idGoal" exact component={Goal} />

          <PrivateRoute path="/list" exact component={List} />
        </ContextProvider>

        <Route component={Error} />
        {props.children}
      </Switch>
    </Router>
  </div>
);

export default App;
