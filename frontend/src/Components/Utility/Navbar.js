import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useToken from '../../Hooks/useToken';

// Bootstrap Components
import { Image, Container } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faCar, faListUl, faAddressCard, faWallet, faIdCard } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Button from './Button';
import Sidebar from './Sidebar';

// Navbar
export default function Navbar(props) {
    const { token, setToken } = useToken();
    const history = useHistory();

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "300px";
    }

    function logout() {
        window.localStorage.clear();
        history.push("/")
    }

    if (token) {
        return (
            <nav className="navbar py-3 shadow">
                <Container fluid className="mx-md-5 d-flex justify-content-between">
                    <Link to="/">
                        <Image src="/logo.svg" alt="Logo PickMeUp!" />
                    </Link>
                    <Link to="/home" className="me-5">
                        <FontAwesomeIcon className="iconButton d-none d-md-block" icon={faHome} size="lg" color="black" />
                    </Link>
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
                    <div onClick={openSidebar}>
                        <Button variant={"Primary"}>{JSON.parse(window.localStorage.getItem("utente")).nome}<FontAwesomeIcon className="ms-2" icon={faBars} fixedWidth /></Button>
                    </div>
                </Container>
            </nav>
        );
    } else {
        return (
            <nav className="navbar py-3 shadow">
                <Container fluid className="mx-md-5 d-flex justify-content-between">
                    <Link to="/">
                        <Image src="/logo.svg" alt="Logo PickMeUp!" />
                    </Link>
                    <Link to="/">
                        <FontAwesomeIcon className="iconButton d-none d-md-block" icon={faHome} size="lg" color="black" />
                    </Link>
                    <FontAwesomeIcon onClick={openSidebar} className="iconButton d-md-none" icon={faBars} size="lg" color="black" />
                    <Sidebar>
                        <Button to={"/"} variant={"Light"}>Home</Button>
                        <Button to={"/signup"} variant={"Light"}>Registrati</Button>
                        <Button to={"/login"} variant={"Primary"}>Accedi</Button>
                    </Sidebar>
                    <div className="buttonsGroup d-none d-md-flex">
                        <Button to={"/signup"} variant={"Light"}>Registrati</Button>
                        <Button to={"/login"} variant={"Primary"}>Accedi</Button>
                    </div>
                </Container>
            </nav>
        );
    }
}