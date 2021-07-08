import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Table, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import SpostaMezzoModal from './SpostaMezzoModal'

export default function ListaMezzi() {
    const [listaMezzi, setListaMezzi] = useState([])
    const [showModals, setShowModals] = useState({
        spostaMezzi: {
            show: false
        }
    })

    useEffect(() => {
        const fetchMezzi = async () => {
            const res = await axios.get("/gestione-mezzi/fetchMezzi")
            setListaMezzi(res.data)
        }
        fetchMezzi()
    }, [])

    function spostaMezzo(key) {
        const data = {
            deposito: key.idDeposito,
            mezzo: {
                tipologia: key.tipologia,
                targa: key.targa,
                _id: key.idMezzo
            },
        }
        try {
            axios.post("/prenotazione/fetchDepositi", { tipologiaMezzo: key.tipologia })
                .then(res => {
                    const depositi = res.data;
                    setShowModals({ ...showModals, spostaMezzi: { show: true, depositi: depositi, data: data } })
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="scrollable-table mt-4">
            <Table id="mezziTable" responsive striped bordered hover className="mb-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tipologia</th>
                        <th>Marca</th>
                        <th>Modello</th>
                        <th>Targa</th>
                        <th>Posizione</th>
                    </tr>
                </thead>
                <tbody className="t-light">
                    {listaMezzi && listaMezzi.map(key => {
                        return (
                            <tr>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdownGestioneMezzi" variant="white">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => spostaMezzo(key)}>Sposta mezzo</Dropdown.Item>
                                            <SpostaMezzoModal show={showModals.spostaMezzi.show}
                                                data={showModals.spostaMezzi.data}
                                                depositi={showModals.spostaMezzi.depositi}
                                                onHide={() => setShowModals({ ...showModals, spostaMezzi: { show: false } })} />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>{key.tipologia}</td>
                                <td>{key.marca}</td>
                                <td>{key.modello}</td>
                                <td>{key.targa}</td>
                                <td>{key.deposito || key.posizione}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}