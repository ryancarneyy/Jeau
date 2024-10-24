import { useState } from "react";
import './CreateUser.css'
import { useNavigate} from "react-router-dom";
import CoffeeCup from '../../images/CoffeeCup.jpg';
import Popup from '../../components/Popup/Popup'



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
    date_of_birth: '',
    role: 'user'
  });
  // Used to turn on the passwordMatch information
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [fieldTakenMessage, setFieldTakenMessage] = useState(null);

  // Used for the popup which happens after a user creation
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const closePopup = () => {
    setPopup(false);
    navigate('/home')
  }

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
  // const passwordMatchText = () => {
  //   return passwordMatch ? <span className="confirm-password-icon password-match-text">&#10003;</span> : <span className="confirm-password-icon password-not-match-text">&times;</span>
  // }

  const errorMessageText = () => {
    return fieldTakenMessage ? <div className="input-div password-match-div"><p className='sign-up-text password-not-match-text'>{fieldTakenMessage}</p></div> : null;
  }

  // hadnles when Create new user button is pressed 
  const handleSubmit = (event) => {
    // keeps form data from being wiped
    event.preventDefault();
    if (passwordMatch) {
      console.log('Form submitted with data', newUser)
      fetch('http://localhost:8000/api/users/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(res => {
        // If 409, need to see if username or email is taken to notify user
        // if (!res.ok && res.status !== 409) {
        //   throw new Error(`${res.status} | Error adding user: `, res.json());
        // }
        return res.json();
      })
      .then(data => {
        // Messages handled in 
        if(data.status > 299) {
          setFieldTakenMessage(data.message)
        }
        else {
          setPopup(true)
          // navigate('/home')
        }
      })
      .catch( err => {
        console.log(err)
        console.error('Error with fetch operation:', err);
        if (err.status === 409) {
          console.log('Error message for duplicate entry')
        }
      })
    }
    else {
      setFieldTakenMessage('passwords do not match');
    }
  }



  // Inputs needed to make new user
  const inputs = [
      { label: 'First Name', inputClass: 'short-input', type: 'text', name: 'first_name'},
      { label: 'Last Name', inputClass: 'short-input',type: 'text', name: 'last_name'},
      { label: 'Username', divClass: 'input-div', inputClass: 'long-input', type: 'text', name: 'username'},
      { label: 'Password', divClass: 'input-div', inputClass: 'long-input', type: 'text', name: 'password'},
      { label: 'Confirm Password', divClass: 'input-div confirm-password-div', inputClass: 'long-input', type: 'text', name: 'confirm_password'},
      { label: 'Date of Birth: MM/DD/YYYY', divClass: 'input-div', inputClass: 'long-input', type: 'text', name: 'date_of_birth', pattern: "{4}-{2}-{2}"},
      { label: 'Email', divClass: 'input-div', inputClass: 'long-input', type: 'text', name: 'email'},
      { label: 'Phone Number', divClass: 'input-div', inputClass: 'long-input', type: 'text', name: 'phone_number'}
    ]
    return (
      <div className="sign-up-page">
        {popup ? <Popup closePopup={closePopup} /> : null }
        <div className="display-div">
          <img className='coffee-cup'src={CoffeeCup}></img>
          <div className='black-gradient'>
            <h1 className="welcome-text">
              <span style={{fontSize: '40px', fontStyle: 'italic'}}>
                Join the Jeau Club today! 
              </span>
              <br></br>
              Exclusive offers, universal rewards, and a welcoming community are on the horizon.
            </h1>
          </div>
        </div>
        <div className="sign-up-div">
        <div className="input-div">
          <h1 className="sign-up-header">Join the Club!</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className='input-div'>
              {inputs.slice(0,2).map((input, index) => (
                  <input 
                    className={input.inputClass}
                    placeholder={input.label}
                    type={input.type}
                    name={input.name}
                    style={index === 1 ? {marginLeft: '1%'} : {marginRight: '1%'}}
                    onChange = {handleInputChange}
                    >
                  </input>
              ))}
          </div>
          {inputs.slice(2).map((input, index) => (
            <>
              <div className={input.divClass} key={index}>
                <input 
                  className={input.inputClass}
                  placeholder={input.label}
                  type={input.type}
                  name={input.name}
                  onChange = {handleInputChange}
                  pattern = {input.name === 'date_of_birth' ? "\\d{2}/\\d{2}/\\d{4}" : null}
                  >
                </input>
                {/* {input.name === 'confirm_password' ? passwordMatchText() : null} */}
              </div>
            </>
           
          ))}
          <div className="input-div">
            <button className='sign-up-button'type="submit">Create User</button>
          </div>
          {errorMessageText()}
        </form>
        </div>
      </div>
    );
}

export default CreateUser;