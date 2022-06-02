import React from 'react';
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Header extends React.Component {

  render() {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/aboutUs">About Us</Link>
        </NavItem>
        <NavItem>
          {
            this.props.auth0.isAuthenticated
              ?
              <LogoutButton />
              :
              <LoginButton />
          }
        </NavItem>
      </Navbar>
    );
  }
}

export default withAuth0(Header);