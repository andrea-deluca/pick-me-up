import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Form } from 'react-bootstrap';

// Codice Fiscale
import { CodiceFiscale } from 'codice-fiscale-js'

// Input CF
export default function InputCodiceFiscale() {
    const [checkCF, setCheckCF] = useState(false);

    // Gestisce il controllo del CF
    useEffect(() => {
        if (checkCF) {
            let datadinascita = new Date(document.querySelector('#dataNascita').value);
            let nome = document.querySelector('#nome').value;
            let cognome = document.querySelector('#cognome').value;
            let sesso = document.querySelector('#sesso').value;
            let giorno = parseInt(datadinascita.getDate());
            let mese = parseInt(datadinascita.getMonth() + 1);
            let anno = parseInt(datadinascita.getFullYear());
            let nazionalita = document.querySelector("#nazionalita").value;
            let comune = nazionalita === "ITALIA" ? document.querySelector("#comune").value : nazionalita;
            let provincia = nazionalita === "ITALIA" ? document.querySelector("#provincia").value : "EE";
            let inputCF = document.querySelector("#CF");

            let cf;
            if ((sesso === "M" || sesso === "F") && (!isNaN(datadinascita.getTime())) && (nazionalita !== "default") && (comune !== "default")) { 
                 cf = CodiceFiscale.compute({
                    name: nome,
                    surname: cognome,
                    gender: sesso,
                    day: giorno,
                    month: mese,
                    year: anno,
                    birthplace: comune,
                    birthplaceProvincia: provincia
                });
            }

            if(cf !== inputCF.value.toUpperCase()){
                inputCF.classList.add("border-danger");
                inputCF.classList.remove("border-success");
            } else{
                inputCF.classList.add("border-success");
                inputCF.classList.remove("border-danger");
            }
        }
        setCheckCF(false)
    }, [checkCF])

    return (
        <Form.Group className="col-6" controlId="CF">
            <Form.Label>Codice fiscale</Form.Label>
            <Form.Control type="text" placeholder="Inserisci il tuo codice fiscale" onBlur={() => setCheckCF(true)} required/>
        </Form.Group>
    );
}

