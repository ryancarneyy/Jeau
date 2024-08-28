import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([])
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    date_of_birth: ''
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
    if (value === newUser.password) {
      // Implement verification consequence here
      setPasswordMatch(true);
    }
    else {
      setPasswordMatch(false);
    }
  }

  const passwordMatchText = () => {
    return passwordMatch ? <p className='sign-up-text password-match-text' >Passwords match!</p> : <p className='sign-up-text password-not-match-text'>Passwords do not match.</p>;
  }

  // Create new user button
  const handleSubmit = (event) => {
    // keeps form data from being wiped
    event.preventDefault();
    if (passwordMatch) {
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
        window.location.reload()
      })
      .catch( err => {
        console.error('Error with fetch operation:', err);
      })
    }
    else {
      alert('Passwords do not match.')
    }
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
              onChange={handleRepeatPassword}>
            </input>
        </div>
        <div>
            {passwordMatchText()}
        </div>
        <div>
          <label>Date of Birth: </label>
            <input 
              type='date'
              name='date_of_birth'
              onChange={handleChange}>
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
          <>
            <li key={id}> <span style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name} </span> </li>
            <ul>
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
