import Me from "./screens/Me";
import TestPage from './screens/TestPage'
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Explore from "./screens/Explore";
import { AuthContextProvider } from "./authAPI/auth-context";

function App() {
  return (
      <AuthContextProvider>
        <Router>
            <Switch>
                <Route exact path='/' component={Explore}/>
                <Route exact path='/me' component={Me}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signUp' component={SignUp}/>
                <Route exact path='/test' component={TestPage}/>
            </Switch>
        </Router>
      </AuthContextProvider>
  );
}

export default App;
