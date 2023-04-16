import './Chat.css';
import { useDispatch,useSelector } from 'react-redux';
import { messageActions } from '../../Store/message-slice';
import axios from 'axios';
const ShowGroup=(props)=>{

const authToken=useSelector(state=>state.auth.token)
const userId=useSelector(state=>state.auth.userId)
const dispatch=useDispatch();
const showGroupMessagesHandler=()=>{
    dispatch(messageActions.setGroupId(props.id))
    
    axios.get("http://localhost:3000/get-messages", {
        params:{groupId:props.id},
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log("group messages",response);
        dispatch(messageActions.setMessages(response.data));
       dispatch(messageActions.setGroupId(props.id))

      })
      .catch((err) => {
        console.log(err);
      });
}
  return(
    <div className="showgroup" onClick={showGroupMessagesHandler}>
      {props.name}
      {props.adminid==userId ? (<div className='float admin'>admin</div>):''}
    </div>
  )
}
export default ShowGroup;