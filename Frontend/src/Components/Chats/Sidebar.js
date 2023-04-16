import { Button } from "react-bootstrap";
import "./Chat.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ShowGroup from "./ShowGroup";
const Sidebar = () => {
  const [isForm, setIsForm] = useState(false);
  const inputGroupRef=useRef('')
  const authToken=useSelector(state=>state.auth.token)
  const name=useSelector(state=>state.auth.name)
  const userId=useSelector(state=>state.auth.userId)
  const groups=useSelector(state=>state.message.groups)
  console.log("groups>>>",groups)
  const openFormHandler = () => {
    setIsForm(true);
  };
  const createGroupHandler = () => {
    setIsForm(false);
    const enteredGroupName=inputGroupRef.current.value;

    const group={
      name:enteredGroupName,
      adminname:name,
      adminid:userId
    }

    axios.post("http://localhost:3000/create-group",group, {
      headers: { Authorization: authToken},
    }).then((response)=>{
      console.log(response)
    })
  };

  return (
    <div className="sidebar">
      <div className="creategroup">
        {!isForm && (
          <button className="button" onClick={openFormHandler}>
            Create Group
          </button>
        )}
        {isForm && (
          <div className="groupform">
            <input
              type="text"
              placeholder="Enter Group name"
              className="groupinput"
              required
              ref={inputGroupRef}
            />
            <button className="button" onClick={createGroupHandler}>
              Create
            </button>
          </div>
        )}
      </div>
      {groups.map((group)=>(
         <ShowGroup name={group.name} id={group.id} adminname={group.adminname} adminid={group.adminid}/>
      ))}
    </div>
  );
};
export default Sidebar;
