import React, { useReducer } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from 'framer-motion';

// Plugin
import Darkmode from './Plugin/Darkmode';

// Custom CSS
import "./Theme.scss";
import './App.css';
import './Components/Animations.css';

// Custom Components
import Navbar from './Components/Utility/Navbar';
import SchermataPrincipale from './Components/SchermataPrincipale';
import SchermataRegistrazione from './Components/SchermataRegistrazione';
import SchermataConfermaRegistrazione from './Components/Autenticazione/ConfermaRegistrazione/SchermataConfermaRegistrazione';
import SchermataLogin from './Components/SchermataLogin';
import SchermataRecuperoPassword from './Components/SchermataRecuperoPassword';
import RecuperoPasswordCompletato from './Components/Autenticazione/RecuperoPassword/RecuperoPasswordCompletato';
import SchermataPersonaleUtente from './Components/SchermataPersonaleUtente';
import SchermataProfilo from './Components/SchermataProfilo';
import SchermataWallet from './Components/SchermataWallet';
import SchermataPatente from './Components/SchermataPatente';
import SchermataPrenotazioniUtente from './Components/SchermataPrenotazioniUtente';
import SchermataConfermaPrenotazione from './Components/SchermataConfermaPrenotazione';
import SelezioneTipologiaVeicolo from './Components/SelezioneTipologiaVeicolo';
import SelezioneVeicolo from './Components/SelezioneVeicolo';

import SchermataMappa from './Components/SchermataMappa'

// export const Router = React.createContext(null);
// const initialState = {
//   registrazione: {
//     richiestaPatente: false,
//     patente: false,
//     credenziali: false,
//     completato: false
//   }
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "RICHIESTA_PATENTE":
//       return {
//         ...state, registrazione: { ...state.registrazione, richiestaPatente: true }, userData: action.payload 
//       }
//     case "REGISTRAZIONE_PATENTE":
//       return {
//         ...state, registrazione: { ...state.registrazione, richiestaPatente: false, patente: true }, userData: action.payload
//       }
//     case "REGISTRAZIONE_CREDENZIALI":
//       return {
//         ...state, registrazione: { ...state.registrazione, richiestaPatente: false, patente: false, credenziali: true }, userData: action.payload
//       }
//     case "COMPLETATO":
//       return {
//         ...state, registrazione: { ...state.registrazione, credenziali: false, completato: true }, userData: action.payload
//       }
//       case "RESET_REGISTRAZIONE":
//         return {
//           ...state, registrazione: { ...state.registarzione, richiestaPatente: false, patente: false, credenziali: false, completato: false}
//         }
//     default:
//       return state;
//   }
// }

// export const Controllo = React.createContext(null);
// const initialState = {
//   completato: false,
// }
// const reducer = (state, action) =>{
//   console.log(action)
//   switch (action.type){
//     case 'CONTINUA_CLICKATO':
//       return {
//         ...state, completato: true, user: action.payload
//       }
//     default:
//       return state;
//     }
//   }

// App
function App() {
  //const [router, dispatch] = useReducer(reducer, initialState)
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      {/* <Router.Provider value={{ router, dispatch }}> */}
        <Route path="*">
          <Navbar />
          <AnimatePresence exitBeforeEnter initial={true}>
            <Switch>
              <Route exact path="/signup" component={SchermataRegistrazione}>
                <SchermataRegistrazione />
              </Route>
              <Route exact path="/registrazione-confermata/" component={SchermataConfermaRegistrazione}>
                <SchermataConfermaRegistrazione />
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
              <Route exact path="/home" component={SchermataPersonaleUtente}>
                <SchermataPersonaleUtente />
              </Route>
              <Route exact path="/gestione-account/profilo" component={SchermataProfilo}>
                <SchermataProfilo />
              </Route>
              <Route exact path="/gestione-account/wallet" component={SchermataWallet}>
                <SchermataWallet />
              </Route>
              <Route exact path="/gestione-account/patente" component={SchermataPatente}>
                <SchermataPatente />
              </Route>
              <Route exact path="/gestione-prenotazioni" component={SchermataPrenotazioniUtente}>
                <SchermataPrenotazioniUtente />
              </Route>
              <Route exact path="/prenota/selezione-tipologia" component={SelezioneTipologiaVeicolo}>
                <SelezioneTipologiaVeicolo />
              </Route>
              <Route exact path="/prenota/selezione-veicolo" component={SelezioneVeicolo}>
                <SelezioneVeicolo />
              </Route>
              <Route exact path="/prenota/conferma" component={SchermataConfermaPrenotazione}>
                <SchermataConfermaPrenotazione />
              </Route>
              <Route exact path="/maps" component={SchermataMappa}>
                <SchermataMappa />
              </Route>
              <Route exact path="/" component={SchermataPrincipale}>
                <SchermataPrincipale />
              </Route>
            </Switch>
          </AnimatePresence>
        </Route>
      {/* </Router.Provider> */}
    </Switch>
  );
}

export default App;
