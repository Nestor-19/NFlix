import React, { useContext } from 'react'
import Button  from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        console.log("User is trying to logout!");
        logout();
        navigate("/");
    }

    return (
        <Button variant="outline-info" className="me-2" onClick={() => handleLogOut()}>Log Out</Button>
    )
}

export default Logout