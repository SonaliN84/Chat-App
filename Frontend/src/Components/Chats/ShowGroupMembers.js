import axios from "axios";
import "./Chat.css";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "../../Store/message-slice";
const ShowGroupMembers = (props) => {
  const isAdmin = useSelector((state) => state.message.isAdmin);
  const groupId = useSelector((state) => state.message.groupId);
  const authToken = useSelector((state) => state.auth.token);
  const groupMembers = useSelector((state) => state.message.groupmembers);
  const groupname = useSelector((state) => state.message.groupname);
  const dispatch = useDispatch();
  const removeMemberHandler = () => {
    axios
      .delete("http://localhost:3000/delete-member", {
        params: { userId: props.id, groupId: groupId },
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log(response);
        let arr = groupMembers.filter((item) => item.id !== props.id);
        dispatch(messageActions.setGroupMembers(arr));
      });
  };

  const makeAdminHandler = () => {
    axios
      .put(
        "http://localhost:3000/make-admin",
        {
          userId: props.id,
          groupId: groupId,
        },
        { headers: { Authorization: authToken } }
      )
      .then(() => {
        alert(`${props.name} is now admin of ${groupname} group`);
      });
  };
  return (
    <div className="showresult">
      <div>{props.name}</div>
      <div>{props.email}</div>
      <div>{props.phonenumber}</div>
      {props.admin == true ? <div className="admin">Admin</div> : ""}
      {isAdmin && props.admin == false && (
        <div>
          <button className="button3" onClick={makeAdminHandler}>
            Make Admin
          </button>
        </div>
      )}
      {isAdmin && props.admin == false && (
        <div>
          <button className="button3" onClick={removeMemberHandler}>
            x
          </button>
        </div>
      )}
    </div>
  );
};
export default ShowGroupMembers;
