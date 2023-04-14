import { Switch,Route } from 'react-router-dom';
import SignUP from './pages/SignUp';
import RootLayout from './pages/RootLayout';

function App() {
  return (
    
  
   <div>
   <RootLayout>
    <Route path='/Signup' exact>
   <SignUP/>
   </Route>
   </RootLayout>
   
   </div>
  );
}

export default App;
