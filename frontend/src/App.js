import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([])
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(false);


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
  
  
  // update new user useState
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [ name ]: value
    });
  }

  // handles verifying correct password 
  const handleRepeatPassword = (event) => {
    const { name, value } = event.target;
    if (value == newUser.password) {
      // Implement verification consequence here
      setPasswordMatch(true);
    }
    else {
      setPasswordMatch(false);
    }
  }

  // Create new user button
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data', newUser)
    fetch('http://localhost:8000/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error adding user: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data.message);
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Create New User</h2>
        <div>
          <label>First Name: </label>
            <input 
              type='text'
              name='first_name'
              onChange={handleChange}>
            </input>
        </div>
        <div>
          <label>Last Name: </label>
            <input 
              type='text'
              name='last_name'
              onChange={handleChange}>
            </input>
        </div>
        <div>
          <label>Username: </label>
            <input 
              type='text'
              name='username'
              onChange={handleChange}>
            </input>
        </div>
        <div>
          <label>Password: </label>
            <input 
              type='text'
              name='password'
              onChange={handleChange}>
            </input>
        </div>
        <div>
          <label>Repeat Password</label>
            <input 
              type='text'
              name='repeat_password'
              onChange={handleChange}>
            </input>
        </div>
        <div>
          <label>Date of Birth: </label>
            <input 
              type='text'
              name='date_of_birth'
              onChange={handleRepeatPassword}>
            </input>
        </div>
        <div>
          <label>Email: </label>
            <input 
              type='text'
              name='email'
              onChange={handleChange}>
            </input>
        </div> 
        <div>
          <label>Phone Number: </label>
            <input 
              type='text'
              name='phone_number'
              onChange={handleChange}>
            </input>
        </div>
        <button type='submit'>Create New User</button>
      </form>


      <br></br>
      <h2>Existing Users</h2>
      <ul>
        {data.map((user, id) => (
          <li key={id}>ID: {user.id} | Username: {user.username} | Email: {user.email} | Password: {user.password}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
