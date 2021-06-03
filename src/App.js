
import './App.css';
import {LandingPage} from "./Pages/LandingPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
      <Router>
          <switch>
              <Route exact path='/' component={LandingPage}/>
          </switch>
      </Router>
  );
}

export default App;
