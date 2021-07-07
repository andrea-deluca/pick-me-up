import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import useSession from '../../../Hooks/useSession';
import axios from 'axios';

import { motion } from 'framer-motion';

import { Container, Row, Col, Image, CardColumns, Nav, Tab, Spinner } from 'react-bootstrap';

import NavAside from '../../Utility/NavAside';
import PrenotazioneCard from './PrenotazioneCard';

export default function SchermataPrenotazioniCliente() {
    const { session, setSession } = useSession()
    const [submit, setSubmit] = useState(false)

    function onClick(e) {
        e.preventDefault()
        setSubmit(true)
        try {
            axios.post("/gestione-prenotazione/fetchPrenotazioniUtente", { _id: session.id })
                .then(res => {
                    window.sessionStorage.setItem("prenotazioni", JSON.stringify(res.data))
                    setSubmit(false)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }


    return (
        <Container fluid className="p-0 h-100">
            <Row className="g-0 h-100 align-items-start">
                <NavAside />
                <Col xs={{ span: 12 }} lg={{ span: 8, offset: 1 }} className="mx-auto ms-lg-auto mt-5">
                    <motion.div
                        initial={{ translateY: 70, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        exit={{ translateY: 70, opacity: 0 }}
                        transition={{ dÎuration: 0.3 }}>
                        <div className="d-flex justify-content-start align-items-center mb-5">
                            <Image fluid className="col-3 mx-3" src="/assets/svg/prenotazioni.svg" />
                            <div className="d-flex flex-column">
                                <p className="h6 t-light">USER ID #{session.id}</p>
                                <h1 className="h1 t-bold">Le mie prenotazioni</h1>
                            </div>
                        </div>
                        <Tab.Container defaultActiveKey="attive" id="listaPrenotazioni">
                            <Row>
                                <Col xs={{ span: 10, offset: 1 }} lg={{ span: 3, offset: 0 }}>
                                    <Nav variant="pills" className="flex-column t-bold">
                                        <Nav.Item >
                                            <Nav.Link eventKey="attive">Attive</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="programmate">Programmate</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="passate">Passate</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={onClick} className="t-light">
                                                <Spinner
                                                    as="span"
                                                    animation={submit ? "border" : ""}
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className={submit ? "me-2" : ""} />
                                                Aggiorna
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col xs={{ span: 12 }} lg={{ span: 9 }} className="my-5 my-lg-0">
                                    <Tab.Content eventKey="attive">
                                        <Tab.Pane eventKey="attive">
                                            <CardColumns className="scrollable row">
                                                {window.sessionStorage.getItem("prenotazioni") && JSON.parse(window.sessionStorage.getItem("prenotazioni")).attive.length !== 0 ?
                                                    JSON.parse(window.sessionStorage.getItem("prenotazioni")).attive.map(key => {
                                                        return (
                                                            <PrenotazioneCard
                                                                id={key._id}
                                                                dataPrenotazione={new Date(key.dataPrenotazione).toLocaleString("it-IT")}
                                                                stato={key.stato}
                                                                tipologiaMezzo={key.mezzo.tipologia}
                                                                idMezzo={key.mezzo._id}
                                                                marca={key.mezzo.marca}
                                                                modello={key.mezzo.modello}
                                                                targa={key.mezzo.targa}
                                                                autista={key.autista}
                                                                dataRitiro={new Date(key.ritiro.data).toLocaleString("it-IT")}
                                                                ritiro={key.ritiro.nome}
                                                                dataConsegna={new Date(key.consegna.data).toLocaleString("it-IT")}
                                                                consegna={key.consegna.nome}
                                                                path={key.mezzo.path}
                                                                tariffaOraria={key.mezzo.tariffa}
                                                                importo={key.pagamento.importoTotale} />
                                                        );
                                                    }) : <h3 className="t-light text-center text-muted">Nessuna prenotazione attiva trovata</h3>}
                                            </CardColumns>
                                        </Tab.Pane>
                                    </Tab.Content>
                                    <Tab.Content eventKey="programmate">
                                        <Tab.Pane eventKey="programmate">
                                            <CardColumns className="scrollable row">
                                                {window.sessionStorage.getItem("prenotazioni") && JSON.parse(window.sessionStorage.getItem("prenotazioni")).programmate.length !== 0 ?
                                                    JSON.parse(window.sessionStorage.getItem("prenotazioni")).programmate.map((key, index) => {
                                                        return (
                                                            <PrenotazioneCard index={index}
                                                                id={key._id}
                                                                dataPrenotazione={new Date(key.dataPrenotazione).toLocaleString("it-IT")}
                                                                stato={key.stato}
                                                                tipologiaMezzo={key.mezzo.tipologia}
                                                                idMezzo={key.mezzo._id}
                                                                marca={key.mezzo.marca}
                                                                modello={key.mezzo.modello}
                                                                targa={key.mezzo.targa}
                                                                autista={key.autista}
                                                                idRitiro={key.ritiro._id}
                                                                dataRitiro={new Date(key.ritiro.data).toLocaleString("it-IT")}
                                                                ritiro={key.ritiro.nome}
                                                                idConsegna={key.consegna._id}
                                                                dataConsegna={new Date(key.consegna.data).toLocaleString("it-IT")}
                                                                consegna={key.consegna.nome}
                                                                path={key.mezzo.path}
                                                                tariffaOraria={key.mezzo.tariffa}
                                                                importo={key.pagamento.importoTotale} />
                                                        );
                                                    }) : <h3 className="t-light text-center text-muted">Nessuna prenotazione programmata trovata</h3>}
                                            </CardColumns>
                                        </Tab.Pane>
                                    </Tab.Content>
                                    <Tab.Content eventKey="passate">
                                        <Tab.Pane eventKey="passate">
                                            <CardColumns className="scrollable row">
                                                {window.sessionStorage.getItem("prenotazioni") && JSON.parse(window.sessionStorage.getItem("prenotazioni")).passate.length !== 0 ?
                                                    JSON.parse(window.sessionStorage.getItem("prenotazioni")).passate.map(key => {
                                                        return (
                                                            <PrenotazioneCard
                                                                id={key._id}
                                                                dataPrenotazione={new Date(key.dataPrenotazione).toLocaleString("it-IT")}
                                                                stato={key.stato}
                                                                tipologiaMezzo={key.mezzo.tipologia}
                                                                idMezzo={key.mezzo._id}
                                                                marca={key.mezzo.marca}
                                                                modello={key.mezzo.modello}
                                                                targa={key.mezzo.targa}
                                                                autista={key.autista}
                                                                dataRitiro={new Date(key.ritiro.data).toLocaleString("it-IT")}
                                                                ritiro={key.ritiro.nome}
                                                                dataConsegna={new Date(key.consegna.data).toLocaleString("it-IT")}
                                                                consegna={key.consegna.nome}
                                                                path={key.mezzo.path} />
                                                        );
                                                    }) : <h3 className="t-light text-center text-muted">Nessuna prenotazione trovata</h3>}
                                            </CardColumns>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </motion.div>
                </Col>
            </Row>
        </Container>
    );
}