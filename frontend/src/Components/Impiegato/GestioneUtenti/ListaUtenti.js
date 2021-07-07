import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Table, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

import CellulareModal from '../../GestioneAccount/Profilo/CellulareModal'
import EmailModal from '../../GestioneAccount/Profilo/EmailModal'
import EliminaAccountModal from '../../GestioneAccount/Profilo/EliminaAccountModal'

export default function ListaUtenti() {
    const [listaUtenti, setListaUtenti] = useState([])
    const [showModals, setShowModals] = useState({
        modificaEmail: false,
        modificaCellulare: false,
        eliminaAccount: false
    })

    useEffect(() => {
        const fetchUtenti = async () => {
            const res = await axios.get("/gestione-utenti/fetchUtenti")
            setListaUtenti(res.data)
        }
        fetchUtenti()
    }, [])

    return (
        <div className="scrollable-table my-5">
            <Table id="utentiTable" responsive striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>#ID utente</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Codice Fiscale</th>
                        <th>Tipologia</th>
                    </tr>
                </thead>
                <tbody className="t-light">
                    {listaUtenti && listaUtenti.map(key => {
                        return (
                            <tr>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdownGestioneUtenti" variant="white">
                                            <FontAwesomeIcon icon={faUserEdit} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            <Dropdown.Item onClick={() => setShowModals({ ...showModals, modificaCellulare: true })}>
                                                Modifica Cellulare
                                            </Dropdown.Item>
                                            <CellulareModal id={key._id} show={showModals.modificaCellulare}
                                            onHide={() => setShowModals({ ...showModals, modificaCellulare: false })} />
                                            <Dropdown.Item onClick={() => setShowModals({ ...showModals, modificaEmail : true})}>
                                                Modifica Email
                                            </Dropdown.Item>
                                            <EmailModal id={key._id} show={showModals.modificaEmail}
                                                onHide={() => setShowModals({ ...showModals, modificaEmail: false })} />
                                            <Dropdown.Item onClick={() => setShowModals({ ...showModals, eliminaAccount : true})}>
                                                Elimina Account
                                            </Dropdown.Item>
                                            <EliminaAccountModal id={key._id} show={showModals.eliminaAccount}
                                                onHide={() => setShowModals({ ...showModals, eliminaAccount: false })} />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>{key._id}</td>
                                <td>{key.nome} </td>
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

