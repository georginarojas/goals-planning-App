import Header from './components/header';
import './css/main.css';

import './css/button.css';

import UserRegisterForm from "./containers/userRegister/form";

const App = () => (
  <div className="App">
    <Header />
    <UserRegisterForm />
  </div>
);

export default App;