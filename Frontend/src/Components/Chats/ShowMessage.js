import "./Chat.css";
import { useSelector } from "react-redux";
const ShowMessage = (props) => {
  const userName = useSelector((state) => state.auth.name);
  const senderName = props.name;
  const URL = props.url;

  let image;

  if (
    props.message.split(".").pop().toLowerCase() === "jpg" ||
    props.message.split(".").pop() === "jpeg" ||
    props.message.split(".").pop() === "png"
  ) {
    image = true;
  } else {
    image = false;
  }

  return (
    <div>
      {userName === senderName && URL == false && (
        <div className="showmessage float border1">{props.message}</div>
      )}
      {image && userName === senderName && URL == true && (
        <img
          className="showmessage float"
          src={props.message}
          style={{ width: "50%", height: "100%" }}
        />
      )}
      {image && userName !== senderName && URL == true && (
        <div>
          <div className="sendername">{props.name}</div>
          <img
            className="showmessage"
            src={props.message}
            style={{ width: "50%", height: "100%" }}
          />
        </div>
      )}
      {userName !== senderName && URL == false && (
        <div>
          <div className="sendername">{props.name}</div>
          <div className="showmessage border2">{props.message}</div>
        </div>
      )}

      {!image && userName === senderName && URL == true && (
        <a href={props.message}>
          <img
            className="showmessage float border1 link"
            src="https://freeiconshop.com/wp-content/uploads/edd/document-download-solid.png"
            style={{ width: "80px", height: "60px" }}
          />
        </a>
      )}

      {!image && userName !== senderName && URL == true && (
        <div>
          <div className="sendername">{props.name}</div>
          <a href={props.message}>
            <img
              className="showmessage border2 link"
              src="https://freeiconshop.com/wp-content/uploads/edd/document-download-solid.png"
              style={{ width: "80px", height: "60px" }}
            />
          </a>
        </div>
      )}
    </div>
  );
};
export default ShowMessage;
