import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";

function Header() {
    return (
        <NavBar bg="light" expand="lg">
            <NavBar.Brand href="/">Whataspp Visualizer</NavBar.Brand>
            <NavBar.Toggle aria-controls="basic-navbar-nav" />
            <NavBar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/total-messages-per-person">
                    Total messages per person
                    </Nav.Link>
                    <Nav.Link as={Link} to="/average-characters-per-message">
                    Average characters per message
                    </Nav.Link>
                    <Nav.Link as={Link} to="/get-by-word">
                    Search by word
                    </Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    );
}

export default Header;
