import React, { useState } from 'react'

import { motion } from 'framer-motion'

import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faWallet, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function RiepilogoCard(props) {
    return (
        <React.Fragment>
            <motion.div
                initial={{ translateX: 50, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <Card className="animation-card border-0 shadow d-none d-lg-block">
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title>
                            <h3 className="t-bold pb-4">Riepilogo</h3>
                            <div className="pb-3">
                                <h5 className="t-bold">Tipologia veicolo</h5>
                                <h6 className="t-light">{props.tipologiaMezzo}</h6>
                            </div>
                            <div className="pb-3">
                                <h5 className="t-bold">Richiesta autista</h5>
                                <h6 className="t-light">{props.autista ? "Si" : "No"}</h6>
                            </div>
                            <div className="pb-3">
                                <h5 className="t-bold">
                                    <FontAwesomeIcon className="me-2" icon={faCalendar} fixedWidth />
                                    Ritiro
                                </h5>
                                <h6 className="t-light">{`${props.dataRitiro}`}</h6>
                                <h6 className="t-light">{`presso ${props.localitaRitiro}`}</h6>
                            </div>
                            <div className="pb-3">
                                <h5 className="t-bold">
                                    <FontAwesomeIcon className="me-2" icon={faCalendar} fixedWidth />
                                    Consegna
                                </h5>
                                <h6 className="t-light">{`${props.dataConsegna}`}</h6>
                                <h6 className="t-light">{`presso ${props.localitaConsegna}`}</h6>
                            </div>
                            {props.totale ?
                                <div>
                                    <h5 className="t-bold">
                                        <FontAwesomeIcon className="me-2" icon={faWallet} fixedWidth />
                                        Importo totale
                                    </h5>
                                    <h6 className="t-light">€{props.totale}</h6>
                                </div> : null}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <RiepilogoCardMobile
                    tipologiaMezzo={props.tipologiaMezzo}
                    autista={props.autista}
                    localitaRitiro={props.localitaRitiro}
                    localitaConsegna={props.localitaConsegna}
                    dataRitiro={props.dataRitiro}
                    dataConsegna={props.dataConsegna} 
                    totale={props.totale} />
            </motion.div>
        </React.Fragment>
    );
}

function RiepilogoCardMobile(props) {
    const [show, setShow] = useState(false)
    const [flipIcon, setFlipIcon] = useState("")

    function showCard() {
        setShow(true)
        const card = document.querySelector("#riepilogo-card-mobile")
        card.style.height = "80vh"
        setFlipIcon("vertical")
    }

    function unShowCard() {
        setShow(false)
        const card = document.querySelector("#riepilogo-card-mobile")
        card.style.height = "100px"
        setFlipIcon("")
    }

    return (
        <Card id="riepilogo-card-mobile" className="border-0 shadow d-lg-none">
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                    <div className="d-flex justify-content-between align-items-baseline">
                        <h3 className="t-bold pb-5">Riepilogo</h3>
                        <div onClick={show ? unShowCard : showCard}>
                            <FontAwesomeIcon className="riepilogo-card-mobile-icon" icon={faArrowUp} flip={flipIcon} />
                        </div>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Tipologia veicolo</h5>
                        <h6 className="t-light">{props.tipologiaMezzo}</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">Richiesta autista</h5>
                        <h6 className="t-light">{props.autista ? "Si" : "No"}</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">
                            <FontAwesomeIcon className="me-2" icon={faCalendar} fixedWidth />
                            Ritiro
                        </h5>
                        <h6 className="t-light">{`${props.dataRitiro}`}</h6>
                        <h6 className="t-light">{`presso ${props.localitaRitiro}`}</h6>
                    </div>
                    <div className="pb-3">
                        <h5 className="t-bold">
                            <FontAwesomeIcon className="me-2" icon={faCalendar} fixedWidth />
                            Consegna
                        </h5>
                        <h6 className="t-light">{`${props.dataConsegna}`}</h6>
                        <h6 className="t-light">{`presso ${props.localitaConsegna}`}</h6>
                    </div>
                    {props.totale ?
                        <div>
                            <h5 className="t-bold">
                                <FontAwesomeIcon className="me-2" icon={faWallet} fixedWidth />
                                Importo totale
                            </h5>
                            <h6 className="t-light">€{props.totale}</h6>
                        </div> : null}
                </Card.Title>
            </Card.Body>
        </Card>
    );
}