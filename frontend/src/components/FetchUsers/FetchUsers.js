import { useState, useEffect } from "react";

const FetchUsers = () => {
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
    <>
        <h2>Existing Users</h2>
        <ul> 
            {data.map((user) => (
            <>
                <li key={user.id}> <span style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name} </span> </li>
                <ul>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>ID: </span>{user.id}</li>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Username: </span> {user.username} </li>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Email: </span>{user.email}</li>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Phone Number: </span> {user.phone_number} </li>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Date of Birth: </span>{user.date_of_birth}</li>
                    <li>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 'bold'}}>Password: </span> {user.password} </li>
                </ul>
            </>
            ))}
        </ul>
    </>
    );
}

export default FetchUsers;