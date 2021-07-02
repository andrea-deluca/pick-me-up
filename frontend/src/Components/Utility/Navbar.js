import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import useSession from '../../Hooks/useSession';

// Bootstrap Components
import { Image, Container, Row, Col } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faCar, faListUl, faAddressCard, faWallet, faIdCard } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from './Button';
import Sidebar from './Sidebar';

// Navbar
export default function Navbar(props) {
    const { token, setToken } = useToken();
    const { session, setSession } = useSession()
    const history = useHistory();

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "300px";
    }

    function logout() {
        window.sessionStorage.clear();
        history.push("/")
    }

    if (token) {
        return (
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
                        <Button onClick={openSidebar} variant={"Primary"}>
                            {session.nome}<FontAwesomeIcon className="ms-2" icon={faBars} fixedWidth />
                        </Button>
                    </Col>
                </Row>
                <Sidebar>
                    <Button to={"/home"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faHome} fixedWidth />Home</Button>
                    <Button to={"/prenota"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faCar} fixedWidth />Prenota</Button>
                    <Button to={"/gestione-prenotazioni"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faListUl} fixedWidth />Le mie prenotazioni</Button>
                    <Button to={"/gestione-account/profilo"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faAddressCard} fixedWidth />Visualizza profilo</Button>
                    <Button to={"/gestione-account/wallet"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faWallet} fixedWidth />Visualizza Wallet</Button>
                    <Button to={"/gestione-account/patente"} variant={"Light"}><FontAwesomeIcon className="me-2" icon={faIdCard} fixedWidth />Visualizza patente</Button>
                    <div onClick={logout}>
                        <Button variant={"Dark"}>Logout</Button>
                    </div>
                </Sidebar>
            </nav>
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