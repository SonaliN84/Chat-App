import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef} from 'react';
import { NavLink } from 'react-router-dom';
const LoginForm=()=>{
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    
    

    const submitHandler=(event)=>{
      event.preventDefault();

      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
    }
  return (
    <Form className='Auth-form border d-grid' onSubmit={submitHandler}>
    <h3 className="alignCenter">Login</h3>
    
     <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" required ref={emailInputRef}/>
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
      </Form.Group>
      
      <Button style={{ background: "#C85C8E", border: "1px solid #C85C8E" }} type="submit" className='my-3'>
        Login
      </Button>
  
    
      <p className="alignCenter">Don't have an account? <NavLink to='/SignUp' className="mb-3 alignCenter decorationNone">Sign Up</NavLink></p>
  </Form> 
  );

}
export default LoginForm;