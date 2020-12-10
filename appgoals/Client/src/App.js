import Header from './utils/header';
import './utils/css/main.css';

import './utils/css/button.css';

import UserRegisterForm from "./containers/userRegister/form";
import UserLogin from "./containers/login/login"

const App = () => (
  <div className="App">
    <Header />
    <UserRegisterForm />
    <UserLogin />
  </div>
);

export default App;