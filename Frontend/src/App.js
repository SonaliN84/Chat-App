import { Switch, Route } from "react-router-dom";
import SignUP from "./pages/SignUp";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import RootLayout from "./pages/RootLayout";

function App() {
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
          <ChatPage/>
        </Route>
      </RootLayout>
    </div>
  );
}

export default App;
