import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../Store/auth-slice";
import { messageActions } from "../../Store/message-slice";

const LoginForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  console.log(authToken);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      const user = {
        email: enteredEmail,
        password: enteredPassword,
      };

      const response = await axios.post(
        "http://localhost:3000/user/login",
        user
      );
      console.log(response);
      console.log(response.data.token);
      console.log(response.data.userName);
      dispatch(messageActions.setMessages([]));
      dispatch(
        authActions.login({
          token: response.data.token,
          name: response.data.userName,
          userId: response.data.userId,
        })
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.userName);
      localStorage.setItem("userid",response.data.userId);
      history.replace("/Chat");

      axios
        .get("http://localhost:3000/get-groups", {
          headers: { Authorization: response.data.token },
        })
        .then((res) => {
          console.log("group list", res);
          console.log(res.data);
          dispatch(messageActions.setGroups(res.data));
        });
    } catch (err) {
      alert(err.response.data.err);
    }
  };
  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 className="alignCenter">Login</h3>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          ref={passwordInputRef}
        />
      </Form.Group>

      <Button
        style={{ background: "#C85C8E", border: "1px solid #C85C8E" }}
        type="submit"
        className="my-3"
      >
        Login
      </Button>

      <p className="alignCenter">
        Don't have an account?{" "}
        <NavLink to="/SignUp" className="mb-3 alignCenter decorationNone">
          Sign Up
        </NavLink>
      </p>
    </Form>
  );
};
export default LoginForm;
