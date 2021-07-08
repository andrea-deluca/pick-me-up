import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuthentication from '../../Hooks/useAuthentication';
import useSession from '../../Hooks/useSession';
import axios from 'axios';

// Bootstrap Components
import { Image, Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faCar, faListUl, faAddressCard, faWallet, faIdCard, faPeopleArrows, faUserEdit, faUserPlus, faSignOutAlt, faInbox } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from './Button';
import Sidebar from './Sidebar';
import Notifiche from './Notifiche';

// Navbar
export default function Navbar(props) {
    const { auth, setAuth } = useAuthentication();
    const { session, setSession } = useSession()
    const history = useHistory();

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "300px";
    }

    function logout() {
        try {
            axios.get("/autenticazione/logout")
                .then(res => {
                    window.localStorage.clear();
                    setAuth(false)
                    history.push("/")
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    if (auth) {
        return (
            <React.Fragment>
                <nav className="container-fluid navbar py-3 shadow">
                    <Row className="w-100 mx-auto align-items-center">
                        <Col>
                            <Link to="/">
                                <Image fluid src="/logo.png" alt="Logo PickMeUp!" />
                            </Link>
                        </Col>
                        <Col className="d-none d-lg-flex justify-content-center">
                            <Link to="/home">
                                <FontAwesomeIcon className="iconButton" icon={faHome} size="lg" color="black" />
                            </Link>
                        </Col>
                        <Col className="justify-content-end d-flex">
                            <Notifiche />
                            <Button onClick={openSidebar} variant={"Primary"}>
                                {session.nome}<FontAwesomeIcon className="ms-2" icon={faBars} fixedWidth />
                            </Button>
                        </Col>
                    </Row>
                    <Sidebar>
                        <Button to={"/home"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faHome} fixedWidth />Home</Button>
                        {
                            session.user === "CLIENTE" &&
                            <>
                                <Button to={"/prenota"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth />Prenota</Button>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faListUl} fixedWidth />Le mie prenotazioni</Button>
                            </>
                        }
                        {session.user === "AMMINISTRATORE" &&
                            <>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faListUl} fixedWidth />Gestione prenotazioni</Button>
                                <Button to={"/gestione-mezzi"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth />Ricerca mezzi</Button>
                                <Button to={"/registrazione-impiegato"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faUserPlus} fixedWidth />Registra impiegato</Button>
                                <Button to={"/gestione-utenti"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faUserEdit} fixedWidth />Modifica utente</Button>
                                <Button to={"/gestione-impiegati"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faPeopleArrows} fixedWidth />Cambia ruoli</Button>
                            </>
                        }
                        {session.user === "GESTORE_MEZZI" &&
                            <>
                                <Button to={"/gestione-mezzi"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth />Ricerca mezzi</Button>
                            </>
                        }
                        {session.user === "AUTISTA" &&
                            <>
                                <Button to={"/gestione-prenotazioni"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth />Le mie corse</Button>
                                <Button to={"/gestione-account/patente"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faIdCard} fixedWidth />Visualizza patente</Button>
                            </>
                        }
                        <Button to={"/gestione-account/profilo"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth />Visualizza profilo</Button>
                        {session.user === "CLIENTE" &&
                            <>
                                <Button to={"/gestione-account/wallet"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faWallet} fixedWidth />Visualizza Wallet</Button>
                                <Button to={"/gestione-account/patente"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faIdCard} fixedWidth />Visualizza patente</Button>
                            </>
                        }
                        <Button onClick={logout} variant={"Dark"}><FontAwesomeIcon className="me-2" icon={faSignOutAlt} fixedWidth />Logout</Button>
                    </Sidebar>
                </nav>
            </React.Fragment>
        );
    } else {
        return (
            <nav className="conatiner-fluid navbar py-3 shadow">
                <Row className="w-100 mx-auto align-items-center">
                    <Col>
                        <Link to="/">
                            <Image fluid src="/logo.png" alt="Logo PickMeUp!" />
                        </Link>
                    </Col>
                    <Col className="d-none d-lg-flex justify-content-center">
                        <Link to="/">
                            <FontAwesomeIcon className="iconButton" icon={faHome} size="lg" color="black" />
                        </Link>
                    </Col>
                    <Col className="justify-content-end d-flex">
                        <FontAwesomeIcon onClick={openSidebar} className="iconButton d-lg-none" icon={faBars} size="lg" color="black" />
                        <div className="buttonsGroup d-none d-lg-flex">
                            <Button to={"/signup"} variant={"Light"}>Registrati</Button>
                            <Button to={"/login"} variant={"Primary"}>Accedi</Button>
                        </div>
                    </Col>
                </Row>
                <Sidebar>
                    <Button to={"/"} variant={"Light"}>Home</Button>
                    <Button to={"/signup"} variant={"Light"}>Registrati</Button>
                    <Button to={"/login"} variant={"Primary"}>Accedi</Button>
                </Sidebar>
            </nav>
        );
    }
}