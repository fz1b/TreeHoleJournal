import {LandingPage} from "./screens/LandingPage";
import TestPage from './screens/TestPage'
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
              <Route exact path='/test' component={TestPage}/>
          </Switch>
      </Router>
  );
}

export default App;
