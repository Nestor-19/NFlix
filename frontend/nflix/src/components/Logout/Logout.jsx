import React, { useContext } from 'react'
import Button  from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';

const Logout = () => {
    const { logout } = useContext(UserContext);

    const handleLogOut = () => {
        console.log("User is trying to logout!");
        logout();
    }

    return (
        <Button variant="outline-info" className="me-2" onClick={() => handleLogOut()}>Log Out</Button>
    )
}

export default Logout