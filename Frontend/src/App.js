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
  const dispatch = useDispatch();

  useEffect(() => {
    function getMessages() {
      axios
        .get("http://localhost:3000/get-messages", {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          console.log(response);
          dispatch(messageActions.setMessages(response.data));
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
    };
  }, [authIsLoggedIn]);

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
