import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([])
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetch('http://localhost:8000/users')
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setData(data);
    })
    .catch(err => console.log)
   }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [ name ]: value
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data', newUser)
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Create New User</h2>
        <div>
          <label>Username: </label>
            <input 
              type='text'
              name='username'
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
          <label>Password: </label>
            <input 
              type='text'
              name='password'
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
