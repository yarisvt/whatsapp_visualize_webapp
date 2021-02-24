import React from "react";

import { Route, Switch, Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import SearchByWord from "./components/SearchByWord";
import AverageWordsMessage from "./components/AverageWordsMessage";
import TotalMessages from "./components/TotalMessages";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Whataspp Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route
          path="/total-messages-per-person"
          render={() => <TotalMessages />}
        />
        <Route
          path="/average-characters-per-message"
          render={() => <AverageWordsMessage />}
        />
        <Route path="/get-by-word" render={() => <SearchByWord />} />
      </Switch>
    </>
  );
};

export default HomePage;
