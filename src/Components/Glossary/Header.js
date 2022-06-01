import React from 'react';
import { withAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Navbar, NavItem } from 'react-bootstrap';


class Header extends React.Component {

  render() {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

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