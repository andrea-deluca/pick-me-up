import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Components
import { Image, Container } from 'react-bootstrap';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons'

// Custom Components
import Button from './Button';
import Sidebar from './Sidebar';

// Navbar
export default function Navbar(props) {

    function openSidebar() {
        let sidebar = document.querySelector("#sidebar");
        sidebar.style.width = "300px";
    }

    return (
        <nav className="navbar py-3 shadow-sm">
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