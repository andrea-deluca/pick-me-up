import React from 'react';
import { Switch, Route } from "react-router-dom";
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Custom CSS
import './App.css';
import './Components/Animations.css';

// Schermate
import View from './Components/Utility/View';
import SchermataPrincipale from './Components/SchermataPrincipale';
import SchermataLogin from './Components/SchermataLogin';

/*
const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={500}>
      <Switch location={location}>
        <Route path="/login" component={SchermataLogin}>
          <SchermataLogin />
        </Route>
        <Route path="/" component={SchermataPrincipale} exact>
          <SchermataPrincipale />
        </Route>
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));
*/

// App
function App() {
  return (
    <View>
      <Switch >
        <Route path="/login" component={SchermataLogin}>
          <SchermataLogin />
        </Route>
        <Route path="/" component={SchermataPrincipale} exact>
          
          <SchermataPrincipale />
        </Route>
      </Switch>
    </View>
  );
}

export default App;
