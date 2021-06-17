import {LandingPage} from "./screens/LandingPage";
import TestPage from './screens/TestPage'
import Login from "./screens/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path='/' component={LandingPage}/>
              <Route exact path='/Login' component={Login}/>
              <Route exact path='/test' component={TestPage}/>
          </Switch>
      </Router>
  );
}

export default App;
