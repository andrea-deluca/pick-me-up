import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCar, faListUl, faAddressCard, faWallet, faIdCard } from '@fortawesome/free-solid-svg-icons';

import NavAsideLink from './NavAsideLink';

export default function NavAside() {
    const [open, setOpen] = useState(false);
    const [flipIcon, setFlipIcon] = useState("");

    useEffect(() => {
        let aside = document.querySelector("#navAside");
        let asideLinks = document.querySelectorAll(".asideLink");
        if (open) {
            aside.style.width = "300px";
            setFlipIcon("horizontal");
            asideLinks.forEach(element => {
                element.style.OTransform = "scale(1)";
                element.style.msTransform = "scale(1)";
                element.style.MozTransform = "scale(1)";
                element.style.webkitTransform = "scale(1)";
                element.style.transform = "scale(1)";
            });
        } else {
            aside.style.width = "75px";
            setFlipIcon("");
            asideLinks.forEach(element => {
                element.style.OTransform = "scale(0)";
                element.style.msTransform = "scale(0)";
                element.style.MozTransform = "scale(0)";
                element.style.webkitTransform = "scale(0)";
                element.style.transform = "scale(0)";
            });
        }
    }, [open]);

    return (
        <div id="navAside" variant="pills" className="d-none d-lg-flex flex-column justify-content-center align-items-center shadow-lg">
            <Row className="mx-auto">
                <div className="arrowIcon mb-5 p-4 d-flex justify-content-start" onClick={() => open ? setOpen(false) : setOpen(true)}>
                    <FontAwesomeIcon icon={faArrowRight} size={"lg"} color={"white"} flip={flipIcon} />
                    <h6 className="asideLink ms-3 t-bold text-light">Chiudi</h6>
                </div>
                <NavAsideLink to={"/prenota"} icon={faCar}>Prenota</NavAsideLink>
                <NavAsideLink to={"/gestione-prenotazioni"} icon={faListUl}>Le mie prenotazioni</NavAsideLink>
                <NavAsideLink to={"/gestione-account/profilo"} icon={faAddressCard}>Visualizza profilo</NavAsideLink>
                <NavAsideLink to={"/gestione-account/wallet"} icon={faWallet}>Visualizza Wallet</NavAsideLink>
                <NavAsideLink to={"/gestione-account/patente"} icon={faIdCard}>Visualizza patente</NavAsideLink>
            </Row>
        </div >
    );
}