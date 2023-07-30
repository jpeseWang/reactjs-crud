import { useContext, useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/DALL·E 2023-07-18 10.00.12 - create logo for technologu page.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
import { toast } from "react-toastify";

const Header = (props) => {
  const nav = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      nav("/");
      toast.success("Log out successfully!");
    }
  }, [user]);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">
          <img src={logo} width="30" height="30"></img>
          <span>User management</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto" activeKey={location.pathname}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/users" className="nav-link">
                  Manage Users
                </Link>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link">Welcome {user.email}</span>
                )}
                <NavDropdown title="Setting" id="basic-nav-dropdown" className>
                  {(user && user.auth) === true ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  )}

                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
