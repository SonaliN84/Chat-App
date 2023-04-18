import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { messageActions } from "../../Store/message-slice";
import ShowSearchUser from "./ShowSearchUser";
import ShowGroupMembers from "./ShowGroupMembers";

const GroupNavBar = () => {
  const dispatch = useDispatch();
  const groupId=useSelector(state=>state.message.groupId)
  const authToken = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.message.isAdmin);
  const [enteredUser, setUser] = useState("");
  const groupMembers=useSelector(state=>state.message.groupmembers)
  const searchResult = useSelector((state) => state.message.searchresult);
  console.log("search result>>", searchResult);
 console.log("groupMembers>>>>>",groupMembers)
  useEffect(() => {
    const identifier = setTimeout(() => {
      axios
        .get("http://localhost:3000/search-user", {
          params: { data: enteredUser },
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log(response.data.users);
          dispatch(messageActions.setSearchResult(response.data.users));
        });
    }, 1000);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [enteredUser]);
  
  const getUserHandler = (event) => {
    setUser(event.target.value);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    dispatch(messageActions.setSearchResult([]));
  };
  const handleShow = () => setShow(true);
  const groupname = useSelector((state) => state.message.groupname);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    axios.get('http://localhost:3000/get-group-members',{
        params: { groupId: groupId },
        headers: { Authorization: authToken },
      })
      .then((response)=>{
        console.log(">>>>>>",response.data)
        dispatch(messageActions.setGroupMembers(response.data))
      })
}

  return (
    <Fragment>
      <div className="groupname mx-2">{groupname}</div>
      <div>
        {isAdmin && (
          <button className="button2 mx-2" onClick={handleShow}>
            Add memeber
          </button>
        )}
        <button className="button2 mx-2" onClick={handleShow1}>
          {" "}
          Group Members
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="text"
                className="input "
                placeholder="Enter Name/Email/Phonenumber"
                onChange={getUserHandler}
              />
            </form>
            <div>
              {searchResult.map((result) => (
                <ShowSearchUser
                  key={result.id}
                  id={result.id}
                  name={result.name}
                  email={result.email}
                />
              ))}
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              {groupMembers.map((result) => (
                <ShowGroupMembers id={result.id} name={result.name} email={result.email} phonenumber={result.phonenumber} admin={result.usergroup.admin} groupMembers={groupMembers}/>
              ))}
            </div>
          </Modal.Body>
         
        </Modal>
      </div>
    </Fragment>
  );
};
export default GroupNavBar;
