import { Fragment } from "react";
import Messages from "./Messages";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Chat.css";
const MessagePanel = () => {
    const authToken=useSelector(state=>state.auth.token)
    const inputMessageRef=useRef('')
    console.log("authToken",authToken)

    const messageSubmitHandler=async(event)=>{
     event.preventDefault();
     const enteredMessage=inputMessageRef.current.value;

     const message={
        message:enteredMessage
     }
      console.log(message)
    const response=await axios.post('http://localhost:3000/send-message',message,{headers:{"Authorization":authToken}})



    }
  
  return (
    <div className="messagepanel">
      <div className="messages">
        <Messages />
      </div>
       <form className="messageInput" onSubmit={messageSubmitHandler}>
        <input type="text" className="input" placeholder="Text something...." ref={inputMessageRef}/>
        <button
          type='submit'
          className="messageButton"
        >
          send
        </button>
        </form>
    
    </div>
  );
};
export default MessagePanel;
