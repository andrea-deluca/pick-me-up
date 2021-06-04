import React from 'react'

// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.style.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    return (
        <button className={buttonClasses}>{props.text}</button>
    );
}