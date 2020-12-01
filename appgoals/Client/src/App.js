import Header from './utils/header';
import './utils/css/main.css';

import './utils/css/button.css';

import UserRegisterForm from "./containers/userRegister/form";

const App = () => (
  <div className="App">
    <Header />
    <UserRegisterForm />
  </div>
);

export default App;