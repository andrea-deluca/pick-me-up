import React, { useEffect, useState } from 'react'

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// REGIONI/PROVINCE/COMUNI JSON
import Nazioni from './Nazioni'
import LuogoNascita from './LuogoNascita'

// Options Regioni from JSON


// Input Nazionalita
export default function InputProvince() {
    const [renderNazionalita, setRenderNazionalita] = useState(true);
    const [optionsNazionalita, setOptionsNazionalita] = useState([]);
    const [renderRegioni, setRenderRegioni] = useState(false);
    const [optionsRegioni, setOptionsRegioni] = useState([]);
    const [renderProvince, setRenderProvince] = useState(false);
    const [optionsProvince, setOptionsProvince] = useState([]);
    const [renderComune, setRenderComune] = useState(false);
    const [optionsComune, setOptionsComune] = useState([]);

    const [checkNazionalita, setCheckNazionalita] = useState(true);

    useEffect(() => {
        if (renderNazionalita) {
            for (let index = 0; index < Object.keys(Nazioni).length; index++) {
                const element = Object.keys(Nazioni)[index];
                setOptionsNazionalita(optionsNazionalita => [...optionsNazionalita, <option value={element}>{element}</option>])
            }
        }
        setRenderNazionalita(false);
    }, [renderNazionalita])

    useEffect(() => {
        if (renderRegioni) {
            for (let index = 0; index < LuogoNascita.regioni.length; index++) {
                const element = LuogoNascita.regioni[index].nome
                setOptionsRegioni(optionsRegioni => [...optionsRegioni, <option value={element}>{element.toUpperCase()}</option>])
            }
        }
        setRenderRegioni(false);
    }, [renderRegioni])

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

    useEffect(() => {
        if(renderComune){
            setOptionsComune([]);
            let regione = document.querySelector("#regione").value;
            let provincia = document.querySelector("#provincia").value;
            for (let i = 0; i < LuogoNascita.regioni.length; i++) {
                if (LuogoNascita.regioni[i].nome === regione){
                    for (let j = 0; j < LuogoNascita.regioni[i].province.length; j++) {
                        if (LuogoNascita.regioni[i].province[j].code === provincia){
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

    useEffect(() => {
        if (checkNazionalita) {
            let nazionalita = document.querySelector("#nazionalita").value;
            let regione = document.querySelector("#regione");
            let provincia = document.querySelector("#provincia");
            let comune = document.querySelector("#comune");
            if (nazionalita !== 'ITALIA') {
                regione.setAttribute("disabled", "disabled");
                provincia.value = "default"
                provincia.setAttribute("disabled", "disabled");
                regione.value = "default"
                comune.setAttribute("disabled", "disabled");
                comune.value = "default"
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
                <Form.Label>Nazionalità</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setCheckNazionalita(true)}>
                    <option value="default" disabled selected>Seleziona...</option>
                    {optionsNazionalita}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="regione">
                <Form.Label>Regione</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderProvince(true)}>
                    <option value="default" disabled selected>Seleziona...</option>
                    {optionsRegioni}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control className="form-select" as="select" onChange={() => setRenderComune(true)}>
                    <option value="default" disabled selected>Seleziona...</option>
                    {optionsProvince}
                </Form.Control>
            </Form.Group>
            <Form.Group className="col-6 col-lg-3" controlId="comune">
                <Form.Label>Comune</Form.Label>
                <Form.Control className="form-select" as="select" >
                    <option value="default" disabled selected>Seleziona...</option>
                    {optionsComune}
                </Form.Control>
            </Form.Group>
        </React.Fragment>

    );
}