import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const  { username } = useParams();

    // FIX MULTI RENDERING PROBLEM TMRW!

    useEffect(() => {
        fetch(`http://localhost:8000/users/profile/${username}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error fetching user profile');
            }
            return res.json();
        })
        .then(data => {
            setUser(data);
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [username]);

    return (
        <div> 
            <h1>My Account:</h1>
            <p>Username: {username}</p>
        </div>
    );
};

export default Profile;