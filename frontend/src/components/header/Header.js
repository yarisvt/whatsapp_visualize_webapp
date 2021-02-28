import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/Navbar";

import { usePeopleStore } from '../../context/PeopleContext';

function Header() {
    const [people, setPeople] = usePeopleStore();
    const [lastAttempt, setLastAttempt] = useState(-1);

    useEffect(() => {
        if (!people.length && (lastAttempt === -1 || Date.now() - lastAttempt >= 30000)) {
            setLastAttempt(Date.now());
            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/people`)
                .then(res => res.json())
                .then((response) => {
                    if (response.success) {
                    setPeople(response.result);
                    }
                }).catch(console.error);
        }
    }, [lastAttempt, people.length, setPeople]);

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
