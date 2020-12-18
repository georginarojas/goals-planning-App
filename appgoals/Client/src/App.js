import {Switch, Route } from "react-router-dom";

import "./utils/css/main.css";

import "./utils/css/button.css";

import Home from "./containers/wellcome-Test";
import UserRegisterForm from "./containers/userRegister/form";
import UserLogin from "./containers/login/login";
import HomeProfile from "./containers/profile/home";

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/register" component={UserRegisterForm} />
      <Route path="/login" component={UserLogin} />
      {/* <Route path="/profile" component={HomeProfile}/> */}
      <Route path="/profile/:userId" component={HomeProfile}/>
      <Route component={Error} />
    </Switch>
  </div>
);

export default App;
