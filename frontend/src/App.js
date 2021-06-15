
import React, {useReducer} from 'react';
import { Switch, Route } from "react-router-dom";
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Plugin
import Darkmode from './Plugin/Darkmode';

// Custom CSS
import "./Theme.scss";
import './App.css';
import './Components/Animations.css';

// Custom Components
import Navbar from './Components/Utility/Navbar';
import SchermataPrincipale from './Components/SchermataPrincipale';
import DatiAnafraficiForm from './Components/Autenticazione/Registrazione/DatiAnagraficiForm';
import RichiestaRegistrazionePatente from './Components/Autenticazione/Registrazione/RichiestaRegistrazionePatente';
import DatiPatenteForm from './Components/Autenticazione/Registrazione/DatiPatenteForm';
import CredenzialiForm from './Components/Autenticazione/Registrazione/CredenzialiForm';
import SchermataLogin from './Components/SchermataLogin';
import SchermataRecuperoPassword from './Components/SchermataRecuperoPassword';
import RecuperoPasswordCompletato from './Components/Autenticazione/RecuperoPassword/RecuperoPasswordCompletato';

export const Controllo = React.createContext(null);
const initialState = {
  completato: false,
}
const reducer = (state, action) =>{
  console.log(action)
  switch (action.type){
    case 'CONTINUA_CLICKATO':
      return {
        ...state, completato: true, user: action.payload
      }
    default:
      return state;
    }
  }

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
  const [controllo, dispatch] = useReducer(reducer, initialState)
  return (
      <Switch >
        <Controllo.Provider value = {{controllo, dispatch}}>
        <Route path="*">
          <Navbar />
          <Switch>
            <Route exact path="/signup" component={DatiAnafraficiForm}>
              <DatiAnafraficiForm />
            </Route>
            <Route exact path="/signup/richiesta-patente" component={RichiestaRegistrazionePatente}>
              <RichiestaRegistrazionePatente />
            </Route>
            <Route exact path="/signup/patente" component={DatiPatenteForm}>
              <DatiPatenteForm />
            </Route>
            <Route exact path="/signup/credenziali" component={CredenzialiForm}>
              <CredenzialiForm />
            </Route>
            <Route exact path="/login" component={SchermataLogin}>
              <SchermataLogin />
            </Route>
            <Route exact path="/recupero-password" component={SchermataRecuperoPassword}>
              <SchermataRecuperoPassword />
            </Route>
            <Route exact path="/recupero-password/completato" component={RecuperoPasswordCompletato}>
              <RecuperoPasswordCompletato />
            </Route>
            <Route exact path="/" component={SchermataPrincipale}>
              <SchermataPrincipale />
            </Route>
          </Switch>
        </Route>
        </Controllo.Provider>
      </Switch>
  );
}

export default App;
