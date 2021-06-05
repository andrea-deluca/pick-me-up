import React from 'react'

// Button
export default function Button(props) {
    const mainButtonClass = "btn";
    const buttonStyle = mainButtonClass + "-" + props.variant.toLowerCase();
    const buttonClasses = mainButtonClass + " " + buttonStyle;

    if(props.submit){

    }

    return (
        <div className="button">
            <button type={props.submit ? "submit" : "button"} className={buttonClasses}>{props.text}</button>
        </div>
        
    );
}