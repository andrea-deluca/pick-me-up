import React, { useEffect, useState } from 'react'

// Bootstrap Components
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

// JSON
import Nazioni from './Nazioni'
import LuogoNascita from './LuogoNascita'
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Input Luogo di nascita
export default function InputLuogoNascita() {
    const [renderNazionalita, setRenderNazionalita] = useState(true);
    const [optionsNazionalita, setOptionsNazionalita] = useState([]);
    const [renderRegioni, setRenderRegioni] = useState(false);
    const [optionsRegioni, setOptionsRegioni] = useState([]);
    const [renderProvince, setRenderProvince] = useState(false);
    const [optionsProvince, setOptionsProvince] = useState([]);
    const [renderComune, setRenderComune] = useState(false);
    const [optionsComune, setOptionsComune] = useState([]);
    const [checkNazionalita, setCheckNazionalita] = useState(true);

    // Popola la select delle nazioni al primo render del componente
    useEffect(() => {
        if (renderNazionalita) {
            for (let index = 0; index < Object.keys(Nazioni).length; index++) {
                const element = Object.keys(Nazioni)[index];
                setOptionsNazionalita(optionsNazionalita => [...optionsNazionalita, <option value={element}>{element}</option>])
            }
        }
        setRenderNazionalita(false);
    }, [renderNazionalita])

    // Popola la select delle regioni
    useEffect(() => {
        if (renderRegioni) {
            for (let index = 0; index < LuogoNascita.regioni.length; index++) {
                const element = LuogoNascita.regioni[index].nome
                setOptionsRegioni(optionsRegioni => [...optionsRegioni, <option value={element}>{element.toUpperCase()}</option>])
            }
        }
        setRenderRegioni(false);
    }, [renderRegioni])

    // Popola la select delle province in base alla regione selezionata
    useEffect(() => {
        if (renderProvince) {
            setOptionsProvince([]);
            let regione = document.querySelector("#regione").value;
            for (let i = 0; i < LuogoNascita.regioni.length; i++) {
                if (LuogoNascita.regioni[i].nome === regione) {
                    for (let j = 0; j < LuogoNascita.regioni[i].province.length; j++) {
                        const element = LuogoNascita.regioni[i].province[j];
                        setOptionsProvince(optionsProvince => [...optionsProvince, <option value={element.code}>{element.nome.toUpperCase()}</option>])
                    }
                }
            }
        }
        setRenderProvince(false);
    }, [renderProvince])

    // Popola la select dei comuni in base alla regione e alla provicia selezionate
    useEffect(() => {
        if (renderComune) {
            setOptionsComune([]);
            let regione = document.querySelector("#regione").value;
            let provincia = document.querySelector("#provincia").value;
            for (let i = 0; i < LuogoNascita.regioni.length; i++) {
                if (LuogoNascita.regioni[i].nome === regione) {
                    for (let j = 0; j < LuogoNascita.regioni[i].province.length; j++) {
                        if (LuogoNascita.regioni[i].province[j].code === provincia) {
                            for (let k = 0; k < LuogoNascita.regioni[i].province[j].comuni.length; k++) {
                                const element = LuogoNascita.regioni[i].province[j].comuni[k].nome;
                                setOptionsComune(optionsComune => [...optionsComune, <option value={element}>{element.toUpperCase()}</option>])
                            }
                        }
                    }
                }

            }
        }
        setRenderComune(false);
    }, [renderComune])

    // Controlla la nazione selezionata.
    // Se è Italia, allora abilita i campi regione, provincia e comune e abilita il flag per
    // popolare le regioni, altrimenti disabilita i campi precedenti
    useEffect(() => {
        if (checkNazionalita) {
            let nazionalita = document.querySelector("#nazionalita").value;
            let regione = document.querySelector("#regione");
            let provincia = document.querySelector("#provincia");
            let comune = document.querySelector("#comune");
            if (nazionalita !== 'ITALIA') {
                regione.setAttribute("disabled", "disabled");
                provincia.value = ""
                provincia.setAttribute("disabled", "disabled");
                regione.value = ""
                comune.setAttribute("disabled", "disabled");
                comune.value = ""
            } else {
                regione.removeAttribute("disabled");
                provincia.removeAttribute("disabled");
                comune.removeAttribute("disabled");
                setRenderRegioni(true);
            }
        }
        setCheckNazionalita(false);
    }, [checkNazionalita])

    return (
        <React.Fragment>
            <Form.Group className="col-6 col-lg-3" controlId="nazionalita">
                <Form.Label className="me-2">Nazione</Form.Label>
                <OverlayTrigger
                    placement={"top"}
                    overlay={
                        <Tooltip id="nazionalitàInfo">
                            La nazionalità e i dati a seguire si riferiscono al luogo di nascita dell'utente.
                            <br />Se la nazione di nascita dovesse essere diversa da quella italiana non verranno richiesti ulteriori dati.
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                </OverlayTrigger>
                <Form.Control className="form-select" as="select" onChange={() => setCheckNazionalita(true)} required>
                    <option value="" disabled selected>Seleziona...</option>
                    {optionsNazionalita}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="regione">
                <Form.Label>Regione</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderProvince(true)} required>
                    <option value="" disabled selected>Seleziona...</option>
                    {optionsRegioni}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderComune(true)} required>
                    <option value="" disabled selected>Seleziona...</option>
                    {optionsProvince}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="comune">
                <Form.Label>Comune</Form.Label>
                <Form.Control className="form-select" as="select" required>
                    <option value="" disabled selected>Seleziona...</option>
                    {optionsComune}
                </Form.Control>
            </Form.Group>
        </React.Fragment>

    );
}