import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function DriveNavBar() {
  return (
    <Navbar bg="light" style={{padding: '20px', justifyContent: 'space-between'}}>
      <Navbar.Brand as={Link} to="/drive">
        Fire Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
