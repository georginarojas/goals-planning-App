import Header from './utils/header';
import './utils/css/main.css';

import './utils/css/button.css';

import UserRegisterForm from "./containers/userRegister/form";
import UserAuthentication from "./containers/userAuthentication/authentication"

const App = () => (
  <div className="App">
    <Header />
    {/* <UserRegisterForm /> */}
    <UserAuthentication />
  </div>
);

export default App;