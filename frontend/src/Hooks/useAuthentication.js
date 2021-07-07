import { useState } from "react";

// Custom Hook: 
// utilizza dietro le quinte l'hook useState di React per ottenere i dati salvati in sessione (localStorage)
// e per modificarli. In particolare gestisce il dato salvato in locale "auth" che memorizza
// lo stato dell'utente come autenticato o no. 

export default function useAuthentication() {
    const getAuth = () => {
        const auth = localStorage.getItem("auth");
        const userAuth = JSON.parse(auth);
        return userAuth;
    };

    const [auth, setAuth] = useState(getAuth());

    const saveAuth = userAuth => {
        localStorage.setItem('auth', userAuth);
        setAuth(userAuth);
    };

    return {
        setAuth: saveAuth,
        auth
    }
}