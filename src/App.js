import {LandingPage} from "./screens/LandingPage";
import TestPage from './screens/TestPage'
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/signUp' component={SignUp}/>
              <Route exact path='/test' component={TestPage}/>
          </Switch>
      </Router>
  );
}

export default App;
