import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logoutSuccess } from "../redux/User/UserSlice"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutSuccess())
    navigate("/login")
  }
  return (
    <Navbar bg="warning" expand="md">
      <Container>
        <Navbar.Brand href="#home">LIBRARY SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo?._id ? (
              <>
                <div className="d-flex gap-2">
                  <h5>Welcome Back {userInfo?.fName}</h5>
                  <Link to="/" onClick={() => handleLogout()}>
                    Logout
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="mx-3">
                  Login
                </NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
