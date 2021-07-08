import React from 'react';
import { Switch, Route, useLocation } from "react-router-dom";

// Framer Motion Components
import { AnimatePresence } from 'framer-motion';

// Custom CSS
import "./Theme.scss";
import './App.css';
import './Components/Animations.css';

// Custom Components
import Navbar from './Components/Utility/Navbar';

// Schermate Principali
import SchermataPrincipale from './Components/SchermataPrincipale';
import SchermataPersonaleUtente from './Components/SchermataPersonaleUtente';
// Schermate Autenticazione
import SchermataRegistrazione from './Components/Autenticazione/SchermataRegistrazione';
import SchermataConfermaRegistrazione from './Components/Autenticazione/ConfermaRegistrazione/SchermataConfermaRegistrazione';
import SchermataLogin from './Components/Autenticazione/SchermataLogin';
import SchermataRecuperoPassword from './Components/Autenticazione/SchermataRecuperoPassword';
import RecuperoPasswordCompletato from './Components/Autenticazione/RecuperoPassword/RecuperoPasswordCompletato';
// Schermate Gestione Account
import SchermataProfilo from './Components/GestioneAccount/SchermataProfilo';
import SchermataWallet from './Components/GestioneAccount/SchermataWallet';
import SchermataPatente from './Components/GestioneAccount/SchermataPatente';
// Schermate Prenotazione
import SchermataPrenotazione from './Components/Prenotazione/SchermataPrenotazione';
// Schermate Gestione Prenotazioni
import SchermataPrenotazioniUtente from './Components/GestionePrenotazioni/SchermataPrenotazioniUtente';

//Schermata Gestione Mezzi
import SchermataGestioneMezzi from './Components/Impiegato/GestioneMezzi/SchermataGestioneMezzi'
import SchermataRegistrazioneImpiegati from './Components/Impiegato/RegistrazioneImpiegati/SchermataRegistrazioneImpiegati';
import SchermataGestioneUtenti from './Components/Impiegato/GestioneUtenti/SchermataGestioneUtenti';
import SchermataGestioneImpiegati from './Components/Impiegato/GestioneImpiegati/SchermataGestioneImpiegati';

import SchermataNotFound from './Components/SchermataNotFound'

import WithAuth from './WithAuth';

// App
function App() {
  const location = useLocation();

  return (
    <Switch location={location} key={location.pathname}>
      <Route path="*">
        <Navbar />
        <Switch>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Route exact path="/" component={SchermataPrincipale}>
              <SchermataPrincipale />
            </Route>
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
              <WithAuth><SchermataPersonaleUtente /></WithAuth>
            </Route>
            <Route exact path="/gestione-account/profilo" component={SchermataProfilo}>
              <WithAuth><SchermataProfilo /></WithAuth>
            </Route>
            <Route exact path="/gestione-account/wallet" component={SchermataWallet}>
              <WithAuth><SchermataWallet /></WithAuth>
            </Route>
            <Route exact path="/gestione-account/patente" component={SchermataPatente}>
              <WithAuth><SchermataPatente /></WithAuth>
            </Route>
            <Route exact path="/prenota" component={SchermataPrenotazione}>
              <WithAuth><SchermataPrenotazione /></WithAuth>
            </Route>
            <Route exact path="/gestione-prenotazioni" component={SchermataPrenotazioniUtente}>
              <WithAuth><SchermataPrenotazioniUtente /></WithAuth>
            </Route>
            <Route exact path="/gestione-mezzi" component={SchermataGestioneMezzi}>
              <WithAuth><SchermataGestioneMezzi /></WithAuth>
            </Route>
            <Route exact path="/registrazione-impiegato" component={SchermataRegistrazioneImpiegati}>
              <WithAuth><SchermataRegistrazioneImpiegati /></WithAuth>
            </Route>
            <Route exact path="/gestione-impiegati" component={SchermataGestioneImpiegati}>
              <WithAuth><SchermataGestioneImpiegati /></WithAuth>
            </Route>
            <Route exact path="/gestione-utenti" component={SchermataGestioneUtenti}>
              <WithAuth><SchermataGestioneUtenti /></WithAuth>
            </Route>
          </AnimatePresence>
        </Switch>
      </Route>
    </Switch>
  );
}

export default App;
