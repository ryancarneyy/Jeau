import { useState } from "react";
import './CreateUser.css'
import { Link, useNavigate } from "react-router-dom";


const CreateUser = () => {
  // Information for new user to get passed to server
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    date_of_birth: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();


  // update new user useState
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPasswordMatch(value === newUser.confirm_password ? true : false)
    }
    else if (name === 'confirm_password') {
      setPasswordMatch(value === newUser.password ? true : false)
    }
    setNewUser({
      ...newUser,
      [ name ]: value
    });
  }

  // Sets the text for if the passwords match or not
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
        alert('User succesfully created!');
        navigate('/home');
      })
      .catch( err => {
        console.error('Error with fetch operation:', err);
        alert('Sign-up form incomplete!')
      })
    }
    else {
      alert('Passwords do not match.')
    }
  }



  const inputs = [
      { label: 'First Name: ', type: 'text', name: 'first_name'},
      { label: 'Last Name: ', type: 'text', name: 'last_name'},
      { label: 'Username: ', type: 'text', name: 'username'},
      { label: 'Password: ', type: 'text', name: 'password'},
      { label: 'Confirm Password: ', type: 'text', name: 'confirm_password'},
      { label: 'Date of Birth: ', type: 'date', name: 'date_of_birth'},
      { label: 'Email: ', type: 'text', name: 'email'},
      { label: 'Phone Number: ', type: 'text', name: 'phone_number'}
    ]
    return (
      <>
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          {inputs.map((input, index) => (
            <div className="sign-up-text" key={index}>
              <label>{input.label} </label>
                <input 
                  type={input.type}
                  name={input.name}
                  // onChange={input.name === 'password' || input.name === 'confirm_password' ? handleConfirmPassword : handleChange}
                  onChange = {handleInputChange}
                  >
                </input>
              {input.label === 'Confirm Password: ' ? passwordMatchText() : null}
            </div>
            
          ))}
          <button type="submit">Create User</button>
        </form>
      </>
    );
}

export default CreateUser;