import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import axios from 'axios';

export default function WithAuth(props) {
    const [state, setState] = useState({
        loading: true, // IMPOSTARE A TRUE
        redirect: false
    });

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("utente"));
        if ((state.loading && (!user || user.length === 0))) {
            setState({ loading: false, redirect: true })
        } else {
            setState({ ...state, loading: false });
        }
    }, [state.loading])


    if (state.loading) {
        return null;
    }
    if (state.redirect) {
        return (
            <Redirect to="/login" />
        );
    }
    return (props.children);

    //const [loggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     if (!loggedIn) {
    //         try {
    //             // Invio una richiesta al server per verificare la validità
    //             axios.get("/token/verificaToken")
    //                 .then(res => {
    //                     switch (res.status) {
    //                         case 200:
    //                             setLoggedIn(true);
    //                     }
    //                 })
    //                 .catch(err => {
    //                     setLoggedIn(false);
    //                 })
    //         }
    //         catch (err) {
    //             console.log(err.response.data.msg)
    //         }
    //     }
    //     console.log(loggedIn)
    // }, [loggedIn])

    // switch (loggedIn) {
    //     case true:
    //         return (
    //             props.children
    //         );
    //     default:
    //         return (
    //             <Redirect to={"/login"} />
    //         );
    // }

}