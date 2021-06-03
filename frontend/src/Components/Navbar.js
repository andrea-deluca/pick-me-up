import Button from './Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

export default function Navbar(){

    return(
        <nav className="navbar navbar-dark bg-dark d-flex justify-content-between py-4 px-5">
            <h2 className="logo">PickMeUp!</h2>
            <FontAwesomeIcon icon={faHome} size="lg" className="white-icon"/>
            <div className="d-flex align-items-center justify-content-center">
                <Button text={"Registrati"} style="Dark" />
                <Button text={"Accedi"} style={"Light"} />
            </div>
        </nav>
    );
}