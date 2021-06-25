import React from 'react'
import { Link } from 'react-router-dom';

import { Spinner } from 'react-bootstrap';

// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.variant.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    if (props.to) {
        return (
            <div className="button">
                <Link to={props.to}>
                    <button type={props.submit ? "submit" : "button"} className={buttonClasses} onClick={props.onClick}>
                        {props.children}
                    </button>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="button">
                <button disabled={props.disabled} type={props.submit ? "submit" : "button"} className={buttonClasses} onClick={props.onClick}>
                    <Spinner
                        as="span"
                        animation={props.spinner ? "border" : ""}
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className={props.spinner ? "me-2" : ""} />{props.children}
                </button>
            </div>
        );
    }
}