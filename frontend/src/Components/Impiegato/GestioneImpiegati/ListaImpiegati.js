import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Table, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import CambiaRuoloModal from './CambiaRuoloModal';

export default function ListaImpiegati() {
    const [listaImpiegati, setListaImpiegati] = useState([])
    const [showModals, setShowModals] = useState({
        cambiaRuolo: {
            show: false
        }
    })

    useEffect(() => {
        const fetchImpiegati = async () => {
            const res = await axios.get("/gestione-impiegati/fetchImpiegati")
            setListaImpiegati(res.data)
        }
        fetchImpiegati()
    }, [])

    return (
        <div className="scrollable my-5">
            <Table id="impiegatiTable" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>#ID impiegato</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Codice Fiscale</th>
                        <th>Tipologia</th>
                    </tr>
                </thead>
                <tbody className="t-light">
                    {listaImpiegati && listaImpiegati.map(key => {
                        return (
                            <tr>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdownGestioneImpiegati" variant="white">
                                            <FontAwesomeIcon icon={faUserEdit} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => setShowModals({ ...showModals, cambiaRuolo: { show: true } })}>
                                                Cambia ruolo
                                            </Dropdown.Item>
                                            <CambiaRuoloModal id={key._id} show={showModals.cambiaRuolo.show} 
                                            onHide={() => setShowModals({ ...showModals, cambiaRuolo: { show: false } })}/>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>{key._id}</td>
                                <td>{key.nome}</td>
                                <td>{key.cognome}</td>
                                <td>{key.email}</td>
                                <td>{key.codiceFiscale}</td>
                                <td>{key.user}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}
