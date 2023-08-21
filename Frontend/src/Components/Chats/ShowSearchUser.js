import axios from "axios";
import "./Chat.css";
import { useSelector } from "react-redux";
const ShowSearchUser = (props) => {
  const groupId = useSelector((state) => state.message.groupId);
  const authToken = useSelector((state) => state.auth.token);
  const addUserToGroupHandler = () => {
    const data = {
      groupId: groupId,
      userId: props.id,
    };
    axios
      .post("http://localhost:3000/add-user-to-group", data, {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="showresult my-3">
      <div>{props.name}</div>
      <div>{props.email}</div>
      <button className="button" onClick={addUserToGroupHandler}>
        Add
      </button>
    </div>
  );
};
export default ShowSearchUser;
