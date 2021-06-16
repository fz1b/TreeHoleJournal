import {LandingPage} from "./screens/LandingPage";
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
          </Switch>
      </Router>
  );
}

export default App;
