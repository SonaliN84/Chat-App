import "./Chat.css";
import { useSelector } from "react-redux";
import ShowMessage from './ShowMessage'
const Messages = () => {
  const messages=useSelector(state=>state.message.messages)
  console.log("messages",messages)

  return (
    <div>
    {messages.map((msg)=>(
    
    <ShowMessage name={msg.name} message={msg.message}/>
     ))}
    </div>
  );
 
};
export default Messages;
