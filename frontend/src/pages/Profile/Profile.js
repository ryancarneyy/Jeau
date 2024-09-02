import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({});
    const [self, setSelf] = useState(false);
    const  { username } = useParams();


    // Multi rendering caused by running App in strictmode (turned off in production)

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
            if(data.self) {
                setSelf(true);
                setUser(data.user);
                console.log(data.user);
            }
            else {
                setSelf(false);
            }

        })
        .catch(err => {
            console.error(err);
        })
    }, [username]);

    if(self) {
        return (
            <div>
                <h1>My Account:</h1>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Permission Error 401: Unauthorized User</h1>
            </div>
        )
    }
};

export default Profile;