import { Form, Button } from "react-bootstrap";
import "./AuthForm.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SignUP = () => {
  const history=useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const submitHandler =async (event) => {
    try{
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

    const user={
      name:enteredName,
      email:enteredEmail,
      phonenumber:enteredPhoneNumber,
      password:enteredPassword
    }
    console.log(user)
   const response= await axios.post('http://localhost:3000/user/signup',user)
  
   alert(response.data.message)
   history.replace('/Login')
  }
  catch(err)
  {
   console.log(err.response.data.err)
   alert(err.response.data.err)
  }

  };
  return (
    <Form className="Auth-form border d-grid" onSubmit={submitHandler}>
      <h3 className="alignCenter">Sign Up</h3>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          required
          ref={nameInputRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          ref={emailInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone number"
          required
          ref={phoneNumberInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
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
        className="mb-2"
        type="submit"
      >
        Submit
      </Button>
      <p className="alignCenter">
        Have an account?{" "}
        <NavLink to="/Login" className="mb-3 alignCenter decorationNone ">
          Login
        </NavLink>
      </p>
    </Form>
  );
};
export default SignUP;
