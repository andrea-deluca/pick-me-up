import React from 'react';
import { Switch, Route } from "react-router-dom";
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Custom CSS
import './App.css';
import './Components/Animations.css';

// Custom Components
import View from './Components/Utility/View';
import Navbar from './Components/Utility/Navbar';
import SchermataPrincipale from './Components/SchermataPrincipale';
import SchermataLogin from './Components/SchermataLogin';
import SchermataRecuperoPassword from './Components/SchermataRecuperoPassword';
import RecuperoPasswordCompletato from './Components/Autenticazione/RecuperoPasswordCompletato';

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
        <Route path="*">
          <Navbar />
          <Switch>
            <Route exact path="/login" component={SchermataLogin}>
              <SchermataLogin />
            </Route>
            <Route exact path="/recupero-password" component={SchermataRecuperoPassword}>
              <SchermataRecuperoPassword/>
            </Route>
            <Route exact path="/recupero-password/completato" component={RecuperoPasswordCompletato}>
              <RecuperoPasswordCompletato/>
            </Route>
            <Route exact path="/" component={SchermataPrincipale}>
              <SchermataPrincipale />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </View>
  );
}

export default App;
