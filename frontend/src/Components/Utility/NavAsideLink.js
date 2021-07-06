import React from 'react';
import { Link } from 'react-router-dom';

// FontAwesome Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Aside Navigation Bar Links
export default function NavAsideLink(props) {
    return (
        <Link to={props.to} className="p-0 m-0">
            <div className="asideIcon p-4 d-flex justify-content-start align-items-bottom">
                <FontAwesomeIcon icon={props.icon} size={"lg"} color={"white"} />
                <h6 className="asideLink ms-3 t-bold text-light">{props.children}</h6>
            </div>
        </Link>
    );
}