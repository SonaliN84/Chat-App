import { Switch, Route } from "react-router-dom";
import SignUP from "./pages/SignUp";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import RootLayout from "./pages/RootLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messageActions } from "./Store/message-slice";

import openSocket from "socket.io-client";

function App() {
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("authIsLoggedIn", authIsLoggedIn);
  
  const userId = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  const msgs = useSelector((state) => state.message.messages);
  console.log("MESSAGES", msgs);
  const groups = useSelector((state) => state.message.groups);

  useEffect(() => {
    const currentGroups = JSON.parse(localStorage.getItem("groups"));
    dispatch(messageActions.setGroups(currentGroups));
    const currentMessages = JSON.parse(localStorage.getItem("messages"));
    dispatch(messageActions.setMessages(currentMessages));
  }, []);

  socket.on("post", (data) => {
    console.log("socket response", data.message);
    console.log(data.message);
    let arr = [];

    arr = [...msgs, data.message];

    console.log("FINAL RESULT", arr);
    dispatch(messageActions.setMessages(arr));
  });

  socket.on("addToGroup", (data) => {
    console.log("enter into socket");
    console.log("ANSWER>>", data.userId, userId);
    if (data.userId == userId) {
      let arr = [];
      console.log("DATA", data);
      let newgroup = { ...data.group.dataValues, usergroup: data.group[0] };
      arr = [...groups, newgroup];
      console.log("ADDED GROUP", data.group);
      dispatch(messageActions.setGroups(arr));
    }
  });

  socket.on("removeFromGroup", (data) => {
    if (data.userId == userId) {
      const newgroups = groups.filter((grp) => grp.id != data.groupId);
      dispatch(messageActions.setGroups(newgroups));
    }
  });

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
export const socket = openSocket("http://localhost:3000");
export default App;
