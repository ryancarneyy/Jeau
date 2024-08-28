import './App.css';
import './components/CreateUser/CreateUser.js'
import CreateUser from './components/CreateUser/CreateUser.js';
import FetchUsers from './components/FetchUsers/FetchUsers.js'

const App = () => {
  return (
    <div className="App">
      <CreateUser></CreateUser>
      <br></br>
      <FetchUsers></FetchUsers>
    </div>
  );
}

export default App;
