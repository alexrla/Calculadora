import React from "react";

import './Button.css';

export default function Button(props)   {
    let classes = "button ";
    classes += props.operation ? "operation " : "";
    classes += props.double ? "doublePositions " : "";
    classes += props.triple ? "triplePositions" : "";
    classes += props.roundOne ? "roundBorderOne" : "";
    classes += props.roundTwo ? "roundBorderTwo" : "";

    return (
        <button onClick={(evento) => props.click && props.click(props.label)} className={classes}>
            {props.label}
        </button>
    );
}