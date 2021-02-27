import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";

import { usePeopleStore } from '../../context/PeopleContext';

function Header() {
    const [people, setPeople] = usePeopleStore();

    useEffect(() => {
        if (!people.length) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/people`)
            .then(res => res.json())
            .then((response) => {
                if (response.success) {
                setPeople(response.result);
                }
            });
        }
    });

    return (
        <NavBar bg="light" expand="lg">
            <NavBar.Brand href="/">Whataspp Visualizer</NavBar.Brand>
            <NavBar.Toggle aria-controls="basic-navbar-nav" />
            <NavBar.Collapse>
                <Nav>
                    <Nav.Link as={Link} to="/group">
                        Group
                    </Nav.Link>
                    <Nav.Link as={Link} to="/personal">
                        Personal
                    </Nav.Link>
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    );
}

export default Header;
