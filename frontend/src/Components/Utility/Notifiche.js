import React, { useEffect, useState } from 'react'
import useSession from '../../Hooks/useSession';
import axios from 'axios';

import { Popover, OverlayTrigger, Badge } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';


import Button from './Button';

export default function Notifiche(props) {
    const [listaNotifiche, setListaNotifiche] = useState(null)
    const { session, setSession } = useSession()

    useEffect(() => {
        const fetchNotificheUtente = () => {
            axios.post("/notifiche/fetchNotificheUtente", { id: session.id })
                .then(res => {
                    setListaNotifiche(res.data)
                })
                .catch(err => {
                    setListaNotifiche(err.response.data)
                })
        }
        fetchNotificheUtente()
    }, [])


    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                    <Popover className="card border-0 shadow">
                        <Popover.Title as="h3" className="t-bold bg-white border-0">
                            Notifiche
                        </Popover.Title>
                        <Popover.Content>
                            {listaNotifiche && (listaNotifiche.length > 0 ? listaNotifiche.map(key => {
                                return (
                                    <div className="notifiche-scrollable">
                                        <h5 className="t-bold">{key.title}</h5>
                                        <h6 className="t-light">{key.message}</h6>
                                        <h6 className="t-light text-muted">{new Date(key.data).toLocaleString("it-IT")}</h6>
                                        <Button to={"/gestione-prenotazioni"} variant={"Primary"} className="mt-3 mb-5">Le mie corse</Button>
                                    </div>
                                );
                            }) : <h6 className="t-light text-muted">{listaNotifiche.message}</h6>)}
                        </Popover.Content>
                    </Popover>
                }>
                <Button variant={"White"}>
                    <Badge variant="dark" className="bg-primary align-self-center me-2">
                        {listaNotifiche && listaNotifiche.length}
                    </Badge>
                    <FontAwesomeIcon icon={faInbox} size="lg" color="black" />
                </Button>
            </OverlayTrigger>
        </>
    );
}