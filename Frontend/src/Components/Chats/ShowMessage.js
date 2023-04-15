import './Chat.css';
import { useSelector } from 'react-redux';
const ShowMessage=(props)=>{
const userName=useSelector(state=>state.auth.name)
const senderName=props.name
 return (
    <div>

  {userName===senderName ? 
  
  (<div className='showmessage float border1'>{props.message}</div>)
   :(
    <div>
    <div className='sendername'>{props.name}</div>
    <div className='showmessage border2'>{props.message}</div>
    </div>) }
     
   </div>
    
 );
}
export default ShowMessage;