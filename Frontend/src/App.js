import { Switch, Route } from "react-router-dom";
import SignUP from "./pages/SignUp";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import RootLayout from "./pages/RootLayout";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "./Store/message-slice";
import axios from "axios";

function App() {
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("authIsLoggedIn", authIsLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  const groupId=useSelector(state=>state.message.groupId)
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    function getMessages() {
      let array=JSON.parse(localStorage.getItem('messages'));
      console.log("array",array)
      let lastId;
      if(array.length===0){

        lastId=0;
      }
      else{
         lastId=array[array.length-1].id
      }

      axios
        .get("http://localhost:3000/get-messages", {params:{lastId:lastId,groupId:groupId},
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log("resposne",response.data.messages);
          if(response.data.messages.length>0){
          console.log("original arry>>>",array)
          if(array.length>30){
          array.shift();
          }
          let newArray=[...array,...response.data.messages]
          localStorage.setItem('messages',JSON.stringify(newArray))
          console.log("new array",newArray)
          dispatch(messageActions.setMessages(newArray))
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (authIsLoggedIn) {
      var interval = setInterval(getMessages, 1000);
    
    }

    return () => {
      clearInterval(interval);
      console.log("clearInterval")

    };
  }, [authIsLoggedIn,groupId]);

  return (
    <div>
      <RootLayout>
        <Route path="/Signup" exact>
          <SignUP />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Chat" exact>
          <ChatPage />
        </Route>
      </RootLayout>
    </div>
  );
}

export default App;
