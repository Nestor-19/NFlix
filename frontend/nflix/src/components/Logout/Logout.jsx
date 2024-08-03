import React from 'react'
import Button  from 'react-bootstrap/Button';

const Logout = () => {
    const logOut = () => {
        console.log("user is trying to logout!");
    }

    return (
        <Button variant="outline-info" className="me-2" onClick={() => logOut()}>Log Out</Button>
    )
}

export default Logout