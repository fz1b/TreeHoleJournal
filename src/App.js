import Me from "./screens/Me";
import TestPage from './screens/TestPage'
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Explore from "./screens/Explore";
import AuthContext from './authAPI/auth-context';
import { useContext } from 'react';

function App() {
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Explore} />

        <Route exact path='/me'>
          {isLoggedIn && <Me />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>

        {!isLoggedIn && (
          <Route exact path='/login' component={Login} />
        )}

        {!isLoggedIn && (
          <Route exact path='/signUp' component={SignUp} />
        )}

        <Route exact path='/test' component={TestPage} />

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
