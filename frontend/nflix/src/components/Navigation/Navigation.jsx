import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import Button  from 'react-bootstrap/Button';
import Container  from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from '../Logout/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Navigation = () => {
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);

  const register = () => {
    navigate('/register');
  }

  const login = () => {
    navigate('/login');
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
            <Navbar.Brand href='/' style={{'color': '#d8b04a', 'font-weight': '700'}}>
                <FontAwesomeIcon icon={faFilm}/> NFlix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar-scroll'/>
            <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                    <NavLink className ="nav-link" to="/">Home</NavLink>
                    <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>      
                </Nav>
                {currentUser ?  
                      <Logout />
                      : 
                      <div>
                        <Button variant="outline-info" className="me-2" onClick={() => login()}>Login</Button>
                        <Button variant="outline-info" onClick={() => register()}>Register</Button>
                      </div>
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation