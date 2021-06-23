import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Form, OverlayTrigger, Tooltip  } from 'react-bootstrap'

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// Input data di nascita
export default function InputDataNascita() {
    const [checkData, setCheckData] = useState(false);

    // Gestisce il controllo della data di nascita e che l'utente abbia almeno 14 anni
    useEffect(() => {
        if (checkData) {
            let now = new Date(); // costruttore data attuale
            let inputDataNascita = document.querySelector("#dataNascita");
            let dataNascitaError = document.querySelector("#dataNascitaError");
            let dataNascita = new Date(inputDataNascita.value);
            // Controlla che il dato inserito sia una data valida
            if (!isNaN(dataNascita.getTime())) {
                inputDataNascita.classList.remove("border-success");
                inputDataNascita.classList.add("border-danger");
                dataNascitaError.classList.remove("d-none");
                // Controlla requisito anno di nascita
                if (parseInt(now.getFullYear()) - parseInt(dataNascita.getFullYear()) < 14) {
                    inputDataNascita.classList.add("border-danger");
                    inputDataNascita.classList.remove("border-success");
                    dataNascitaError.classList.remove("d-none");
                } else if ((parseInt(now.getFullYear()) - parseInt(dataNascita.getFullYear())) === 14) {
                    // Controlla requisito mese di nascita
                    if (parseInt(now.getMonth()) - parseInt(dataNascita.getMonth()) < 0) {
                        inputDataNascita.classList.add("border-danger");
                        inputDataNascita.classList.remove("border-success");
                        dataNascitaError.classList.remove("d-none");
                    } else if ((parseInt(now.getMonth()) - parseInt(dataNascita.getMonth())) === 0) {
                        //controlla requisito giorno di nascita
                        if ((parseInt(now.getDate()) - parseInt(dataNascita.getDate())) < 0) {
                            inputDataNascita.classList.add("border-danger");
                            inputDataNascita.classList.remove("border-success");
                            dataNascitaError.classList.remove("d-none");
                        } else {
                            inputDataNascita.classList.add("border-success");
                            inputDataNascita.classList.remove("border-danger");
                            dataNascitaError.classList.add("d-none");
                        }
                    }
                } else {
                    inputDataNascita.classList.add("border-success");
                    inputDataNascita.classList.remove("border-danger");
                    dataNascitaError.classList.add("d-none");
                }
            } else {
                inputDataNascita.classList.add("border-danger");
                inputDataNascita.classList.remove("border-success");
                dataNascitaError.classList.remove("d-none");
            }

        }
        setCheckData(false);
    }, [checkData])

    return (
        <Form.Group controlId="dataNascita">
            <Form.Label className="pe-2">Data di nascita</Form.Label>
            <OverlayTrigger
                placement={"top"}
                overlay={
                    <Tooltip id="dataNascitaInfo">
                        Formato valido per la data di nascita: AAAA-MM-GG.
                    </Tooltip>
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
            </OverlayTrigger>
            <Form.Control type="date" placeholder="Inserisci data di nascita" onBlur={() => setCheckData(true)} pattern="[0-9]{4}-[0-1][0-9]-[0-3][0-9]" maxLength="10" required/>
            <Form.Text id="dataNascitaError" className="d-none text-danger">Devi avere almeno 14 anni per registrarti!</Form.Text>
        </Form.Group>
    );
}