import React from 'react';

import SchermataErrore from './Utility/SchermataErrore'

export default function SchermataNotFound() {
    return (
        <SchermataErrore
            imagePath={"/assets/svg/404-not-found"}
            imageAlt={"Not Found"}
            title={"Ops, sembra che qui non ci sia nulla"}
            buttonTo={"/"}
            buttonLabel={"Torna alla home"}>
            "La pagina che hai cercato non è stata trovata, ti invitiamo a riprovare"
        </SchermataErrore>
    );
}