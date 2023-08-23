import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import { socket } from "../../App";
import "./Header.css";
import { messageActions } from "../../Store/message-slice";
const Header = () => {
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const groupId = useSelector((state) => state.message.groupId);
  const logoutHandler = () => {
    socket.emit("leaveroom", groupId);
    dispatch(messageActions.setGroupId(null));
    dispatch(messageActions.setGroupName(null));

    dispatch(messageActions.setGroups([]));
    dispatch(messageActions.setMessages([]));
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("messages");
    localStorage.removeItem("userid");
    localStorage.removeItem("groups");
    localStorage.removeItem("groupId");
    localStorage.removeItem("groupname");
    localStorage.removeItem("searchresult");
    localStorage.removeItem("isAdmin");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="Header">
      <Container>
        <Navbar.Brand style={{ color: "white" }}>Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {!authIsLoggedIn && (
              <Nav.Link>
                <Link to="/Login" className="loginSignupTitles">
                  Login
                </Link>
              </Nav.Link>
            )}
            {!authIsLoggedIn && (
              <Nav.Link>
                <Link to="/Signup" className="loginSignupTitles">
                  Sign Up
                </Link>
              </Nav.Link>
            )}
            {authIsLoggedIn && (
              <Nav.Link>
                <Link
                  to="/Login"
                  className="loginSignupTitles"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
