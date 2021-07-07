import { useState } from "react";

// Custom Hook: 
// utilizza dietro le quinte l'hook useState di React per ottenere i dati salvati in sessione (localStorage)
// e per modificarli. Utile per non ripetere nel codice "window.localStorage.getItem(...)" 
// oppure "window.localStorage.setItem(...)" ed avere un accesso più immediato alla sessione

export default function useSession(){
    const getSession = () => {
        const sessionString = localStorage.getItem("utente");
        const userSession = JSON.parse(sessionString);
        return userSession;
    };

    const [session, setSession] = useState(getSession());

    const saveSession = userSession => {
        localStorage.setItem('utente', JSON.stringify(userSession));
        setSession(userSession);
    };

    return {
        setSession: saveSession,
        session
    }
}