import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Custom CSS
import './App.css';

// Schermate
import SchermataPrincipale from './Components/SchermataPrincipale';
import SchermataLogin from './Components/SchermataLogin';


// App
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login">
          <SchermataLogin />
        </Route>
        <Route path="/">
          <SchermataPrincipale />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
