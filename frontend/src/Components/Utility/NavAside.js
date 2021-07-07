import React, { useEffect, useState } from 'react'
import useSession from '../../Hooks/useSession';

// Framer Motion Components
import { motion } from 'framer-motion';

// Bootstrap Components
import { Row } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCar, faListUl, faAddressCard, faWallet, faIdCard, faPeopleArrows, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import NavAsideLink from './NavAsideLink';

// AGGIUNGERE CONTROLLO SULLA LOCATION CORRENTE PER LINK ATTIVO

// Aside Navigation Bar
export default function NavAside() {
    const [open, setOpen] = useState(false);
    const [flipIcon, setFlipIcon] = useState("");
    const { session, setSession } = useSession()

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
        <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: -100, opacity: 0 }}
            transition={{ dÎuration: 0.1 }}
            id="navAside" variant="pills" className="d-none d-lg-flex flex-column justify-content-center align-items-center shadow-lg">
            <Row className="mx-auto">
                <div className="arrowIcon mb-5 p-4 d-flex justify-content-start" onClick={() => open ? setOpen(false) : setOpen(true)}>
                    <FontAwesomeIcon icon={faArrowRight} size={"lg"} color={"white"} flip={flipIcon} />
                    <h6 className="asideLink ms-3 t-bold text-light">Chiudi</h6>
                </div>
                {session.user === "CLIENTE" &&
                    <>
                        <NavAsideLink to={"/prenota"} icon={faCar}>Prenota</NavAsideLink>
                        <NavAsideLink to={"/gestione-prenotazioni"} icon={faListUl}>Le mie prenotazioni</NavAsideLink>
                    </>}
                {session.user === "AMMINISTRATORE" &&
                    <>
                        <NavAsideLink to={"/gestione-prenotazioni"} icon={faListUl}>Gestione prenotazioni</NavAsideLink>
                        <NavAsideLink to={"/gestione-mezzi"} icon={faCar}>Gestione mezzi</NavAsideLink>
                        <NavAsideLink to={"/registrazione-impiegato"} icon={faUserPlus}>Registra impiegato</NavAsideLink>
                        <NavAsideLink to={"/gestione-utenti"} icon={faUserEdit}>Modifica Utente</NavAsideLink>
                        <NavAsideLink to={"/gestione-impiegati"} icon={faPeopleArrows}>Cambia ruoli</NavAsideLink>
                    </>
                }
                <NavAsideLink to={"/gestione-account/profilo"} icon={faAddressCard}>Visualizza profilo</NavAsideLink>
                {session.user === "CLIENTE" &&
                    <>
                        <NavAsideLink to={"/gestione-account/wallet"} icon={faWallet}>Visualizza Wallet</NavAsideLink>
                        <NavAsideLink to={"/gestione-account/patente"} icon={faIdCard}>Visualizza patente</NavAsideLink>
                    </>
                }
                {session.user === "GESTORE_MEZZI" &&
                    <>
                        <NavAsideLink to={"/gestione-mezzi"} icon={faCar}>Gestione mezzi</NavAsideLink>
                    </>
                }
            </Row>
        </motion.div >
    );
}