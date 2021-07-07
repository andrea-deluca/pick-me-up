import React from 'react';

import SchermataErrore from './Utility/SchermataErrore'

export default function SchermataPermessoNegato() {
    return (
        <SchermataErrore
            imagePath={"/assets/svg/accesso-negato.svg"}
            imageAlt={"Permesso Negato"}
            title={"Accesso Negato"}
            buttonTo={"/"}
            buttonLabel={"Torna alla home"}>
            Non hai i permessi necessari per accedere alla pagina.
        </SchermataErrore>
    );
}