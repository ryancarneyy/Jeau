import { useEffect, useState } from 'react';
import './App.css';
import './components/CreateUser/CreateUser.js'
import CreateUser from './components/CreateUser/CreateUser.js';

const App = () => {
  const [data, setData] = useState([]);

  // Fetch users from database 
  useEffect(() => {
    fetch('http://localhost:8000/users')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setData(data);
    })
    .catch(err => console.log)
   }, []);
  


  return (
    <div className="App">
      <CreateUser></CreateUser>

      <br></br>
      <h2>Existing Users</h2>
      <ul> 
        {data.map((user, id) => (
          <>
            <li key={id}> <span style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name} </span> </li>
            <ul>
              <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>ID: </span>{user.id}</li>
              <li key={id + 'username'}>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Username: </span> {user.username} </li>
              <li key={id + 'email'}>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Email: </span>{user.email}</li>
              <li key={id + 'phone_number'}>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Phone Number: </span> {user.phone_number} </li>
              <li key={id + 'date_of_birth'}>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Date of Birth: </span>{user.date_of_birth}</li>
              <li key={id + 'password'}>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Password: </span> {user.password} </li>
            </ul>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
