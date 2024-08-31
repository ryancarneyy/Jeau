import { useEffect, useState } from "react";

const Account = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/users/profile')
        .then(res => {
            if (!res.ok) {
                throw new Error('Error fetching user profile');
            }
            return res.json();
        })
        .then(data => {
            setUser(data);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <h1>My Account</h1>
    );
};

export default Account;