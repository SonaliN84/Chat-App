import { Fragment } from "react";
import Messages from "./Messages";
import { Button } from "react-bootstrap";
import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import GroupNavBar from "./GroupNavBar";
import "./Chat.css";
const MessagePanel = () => {
    const authToken=useSelector(state=>state.auth.token)
    const groupId=useSelector(state=>state.message.groupId)
    const inputMessageRef=useRef('')
    console.log("authToken",authToken)

    const messageSubmitHandler=async(event)=>{
     event.preventDefault();
     const enteredMessage=inputMessageRef.current.value;

     const message={
        message:enteredMessage
     }
      console.log(message)
    axios.post('http://localhost:3000/send-message',message,{params:{groupId:groupId},headers:{"Authorization":authToken}})
    .then((response)=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err.response.data.error)
      alert(err.response.data.error)
    })
    inputMessageRef.current.value=''
    }
  
  return (
    <div className="messagepanel">
     <div className="groupnavbar">
      {groupId!=undefined ? (<GroupNavBar/>):''}
     </div>
      <div className="messages">
        <Messages />
      </div>
       <form className="messageInput" onSubmit={messageSubmitHandler}>
        <input type="text" className="input" placeholder="Text something...." ref={inputMessageRef} required/>
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
