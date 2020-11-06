import Header from './components/header';
import './css/main.css';

import './css/button.css';

import UserForm from "./views/userRegister/userRegister";

const App = () => (
  <div className="App">
    <Header />
    <UserForm />
  </div>
);

export default App;