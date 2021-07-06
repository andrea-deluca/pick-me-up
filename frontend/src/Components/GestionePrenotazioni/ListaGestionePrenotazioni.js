import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Table, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import AnnullaPrenotazioneModal from './AnnullaPrenotazioneModal';
import TerminaNoleggioModal from './TerminaNoleggioModal';
import AlertMessage from '../Utility/AlertMessage';
import EstendiNoleggioModal from './EstendiNoleggioModal';

export default function ListaGestionePrenotazioni() {
    const [listaPrenotazioni, setListaPrenotazioni] = useState([])
    const [showModals, setShowModals] = useState({
        annullaPrenotazione: false,
        terminaNoleggio: false,
        estendiNoleggio: false
    })
    const [state, setState] = useState({
        error: {
            show: false
        },
        success: {
            show: false
        }
    })
    const history = useHistory()

    useEffect(() => {
        const fetchPrenotazioni = async () => {
            const res = await axios.get("/gestione-prenotazione/fetchPrenotazioni")
            setListaPrenotazioni(res.data)
        }
        fetchPrenotazioni()
    }, [])

    function modificaPrenotazione(key) {
        const datiPrenotazione = {
            _id: key._id,
            opCode: "MODIFICA",
            tipologiaMezzo: key.mezzo.tipologia,
            autista: key.autista,
            idUtente: key.datiUtente[0]._id
        }
        try {
            axios.post("/prenotazione/fetchDepositi", datiPrenotazione)
                .then(res => {
                    history.push("/prenota", {
                        payload: {
                            datiPrenotazione: datiPrenotazione,
                            depositi: res.data
                        },
                        type: "FORM_PRENOTAZIONE"
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function cambiaMezzo(key) {
        const datiPrenotazione = {
            _id: key._id,
            opCode: "CAMBIA_MEZZO",
            tipologiaMezzo: key.mezzo.tipologia,
            autista: key.autista,
            idUtente: key.datiUtente[0]._id,
            ritiro: {
                localita: key.ritiro._id,
                nome: key.ritiro.nome,
                data: key.ritiro.data
            },
            consegna: {
                localita: key.consegna._id,
                nome: key.consegna.nome,
                data: key.consegna.data
            }
        }
        try {
            axios.post("/prenotazione/fetchVeicoliDisponibili", datiPrenotazione)
                .then(res => {
                    history.push("/prenota", {
                        payload: {
                            datiPrenotazione: datiPrenotazione,
                            veicoli: res.data
                        },
                        type: "SELEZIONE_MEZZO"
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function iniziaNoleggio(key) {
        try {
            axios.put("/gestione-prenotazione/iniziaNoleggio", { _id: key._id, idUtente: key.datiUtente[0]._id })
                .then(res => {
                    setState({ ...state, success: { show: true, message: res.data.message } })
                })
                .catch(err => {
                    setState({ ...state, error: { show: true, message: err.response.data } })
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    function terminaNoleggio(key) {
        try {
            axios.post("/prenotazione/fetchDepositi", { tipologiaMezzo: key.mezzo.tipologia })
                .then(res => {
                    setShowModals({ ...showModals, terminaNoleggio: { show: true, depositi: res.data } })
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <React.Fragment className="my-5 scrollable">
            <AlertMessage
                show={state.success.show || state.error.show}
                variant={state.success.show ? "success" : "danger"}
                header={state.success.show ? "Operazione completata con successo" : "Operazione fallita!"}
                body={state.success.show ? state.success.message : state.error.message}
                button={"Chiudi"}
                onClick={() => { state.success ? history.go(0) : setState({ ...state, error: { show: false } }) }} />
            <Table id="prenotazioniTable" responsive striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>#ID Prenotazione</th>
                        <th>#ID Cliente</th>
                        <th>Email</th>
                        <th>Data di prenotazione</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody className="t-light">
                    {listaPrenotazioni.map(key => {
                        return (
                            <tr>
                                <td>
                                    {key.stato === "PROGRAMMATA" ?
                                        <><Dropdown>
                                            <Dropdown.Toggle id="dropdownGestionePrenotazione" variant="white">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => cambiaMezzo(key)}>Cambia mezzo</Dropdown.Item>
                                                <Dropdown.Item onClick={() => modificaPrenotazione(key)}>Modifica</Dropdown.Item>
                                                <Dropdown.Item onClick={() => setShowModals({ ...showModals, annullaPrenotazione: true })}>Annulla prenotazione</Dropdown.Item>
                                                <AnnullaPrenotazioneModal idUtente={key.datiUtente[0]._id} idPrenotazione={key._id}
                                                    show={showModals.annullaPrenotazione}
                                                    onHide={() => setShowModals({ ...showModals, annullaPrenotazione: false })} />
                                            </Dropdown.Menu></Dropdown></> : (key.stato === "ATTIVA" ?
                                                <><Dropdown>
                                                    <Dropdown.Toggle id="dropdownGestionePrenotazione" variant="white">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => setShowModals({ ...showModals, estendiNoleggio: true })}>Estendi noleggio</Dropdown.Item>
                                                        <EstendiNoleggioModal idPrenotazione={key._id} dataConsegna={key.consegna.data} idUtente={key.datiUtente[0]._id}
                                                            show={showModals.estendiNoleggio}
                                                            onHide={() => setShowModals({ ...showModals, estendiNoleggio: false })} />
                                                        <Dropdown.Item onClick={() => iniziaNoleggio(key)}>Inizia noleggio</Dropdown.Item>
                                                    </Dropdown.Menu></Dropdown></> : (key.stato === "INIZIATA" ?
                                                        <><Dropdown>
                                                            <Dropdown.Toggle id="dropdownGestionePrenotazione" variant="white">
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => setShowModals({ ...showModals, estendiNoleggio: true })}>Estendi noleggio</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => terminaNoleggio(key)}>Termina noleggio</Dropdown.Item>
                                                                <EstendiNoleggioModal idPrenotazione={key._id} dataConsegna={key.consegna.data} idUtente={key.datiUtente[0]._id}
                                                                    show={showModals.estendiNoleggio}
                                                                    onHide={() => setShowModals({ ...showModals, estendiNoleggio: false })} />
                                                                <TerminaNoleggioModal
                                                                    idPrenotazione={key._id} idUtente={key.datiUtente[0]._id}
                                                                    show={showModals.terminaNoleggio}
                                                                    onHide={() => setShowModals({ ...showModals, terminaNoleggio: false })} />
                                                            </Dropdown.Menu></Dropdown></> :
                                                        <Dropdown.Toggle style={{ color: "lightgray" }} variant="white"><FontAwesomeIcon icon={faEdit} color={"lightgray"} /></Dropdown.Toggle>))}
                                </td>
                                <td>{key._id}</td>
                                <td>{key.datiUtente[0]._id}</td>
                                <td>{key.datiUtente[0].credenziali.email}</td>
                                <td>{new Date(key.dataPrenotazione).toLocaleDateString("it-IT")}</td>
                                <td>{key.stato}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </React.Fragment>
    );
}