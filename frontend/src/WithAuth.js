import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import useAuthentication from './Hooks/useAuthentication';
import axios from 'axios';

export default function WithAuth(props) {
    const { auth, setAuth } = useAuthentication()
    const [state, setState] = useState({
        loading: true,
        redirect: false
    });

    console.log(state)

    useEffect(() => {
        try {
            // Invio una richiesta al server per verificare la validità
            axios.get("/checkToken")
                .then(res => {
                    if (res.status === 200) {
                        setAuth(true)
                        setState({ ...state, loading: false });
                    }
                })
                .catch(err => {
                    window.localStorage.clear()
                    setAuth(false)
                    setState({ loading: false, redirect: true });
                })
        }
        catch (err) {
            console.log(err.response.data.msg)
        }
    }, [])

    if (state.loading) {
        return null
    }

    if (state.redirect) {
        return (
            <Redirect to={"/login"} />
        );
    }

    return (
        props.children
    );
}