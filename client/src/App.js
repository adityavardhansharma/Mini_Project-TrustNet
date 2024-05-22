import './App.css';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddMed from './AddMed';
import Supply from './Supply'
import Track from './Track'
import Front from './front'; // Import the new Front component
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" exact component={Front} /> {/* Use Front as the landing page */}
          <Route path="/home" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
