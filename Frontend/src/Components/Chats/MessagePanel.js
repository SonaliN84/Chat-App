import { Fragment } from "react";
import Messages from "./Messages";
import "./Chat.css";
import { Button } from "react-bootstrap";
const MessagePanel = () => {
  return (
    <div className="messagepanel">
      <div className="messages">
        <Messages />
      </div>
      <div className="messageInput">
        <input type="text" className="input" placeholder="Text something...." />
        <Button
          size="sm"
          style={{
            backgroundColor: "#C85C8E",
            border: "none",
            padding: "7px 10px",
            outline: "none",
          }}
        >
          send
        </Button>
      </div>
    </div>
  );
};
export default MessagePanel;
