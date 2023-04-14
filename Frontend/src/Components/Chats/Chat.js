import Sidebar from "./Sidebar";
import MessagePanel from "./MessagePanel";
import "./Chat.css";
const Chat = () => {
  return (
    <div className="chatpage">
      <Sidebar />
      <MessagePanel />
    </div>
  );
};
export default Chat;
