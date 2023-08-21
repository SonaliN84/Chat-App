import { Fragment, useState } from "react";
import Messages from "./Messages";

import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import GroupNavBar from "./GroupNavBar";

import "./Chat.css";
const MessagePanel = () => {
  const authToken = useSelector((state) => state.auth.token);
  const groupId = useSelector((state) => state.message.groupId);
  const inputMessageRef = useRef("");
  const [selectedfile, setSelectedFile] = useState(null);
  console.log("authToken", authToken);

  const messageSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredMessage = inputMessageRef.current.value;

    if (enteredMessage.length > 0) {
      const message = {
        message: enteredMessage,
      };
      console.log(message);
      axios
        .post("http://localhost:3000/send-message", message, {
          params: { groupId: groupId },
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          alert(err.response.data.error);
        });

      inputMessageRef.current.value = "";
    }
    if (selectedfile !== null) {
      let formData = new FormData();
      console.log("SELECTED FILE", selectedfile);
      formData.append("myfile", selectedfile);
      console.log("FORMDATA", formData);

      axios
        .post("http://localhost:3000/send-message", formData, {
          params: { groupId: groupId },
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log(response);
          setSelectedFile(null);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          alert(err.response.data.error);
          setSelectedFile(null);
        });
    }
  };

  return (
    <div className="messagepanel">
      <div className="groupnavbar">
        {groupId != undefined ? <GroupNavBar /> : ""}
      </div>
      <div className="messages">
        <Messages />
      </div>
      <form
        className="messageInput"
        onSubmit={messageSubmitHandler}
        encType="multipart/form-data"
      >
        <input
          type="text"
          className="input"
          placeholder="Text something...."
          ref={inputMessageRef}
        />
        <label htmlfor="myfile">Select a file:</label>
        <input
          type="file"
          name="myfile"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
              console.log("SELECTED FILE", selectedfile);
              alert("file uploaded");
            }
          }}
          id="myfile"
        />
        <button type="submit" className="messageButton">
          send
        </button>
      </form>
    </div>
  );
};
export default MessagePanel;
