import React from 'react';

import classes from "./buttonGradient.module.css";
import classesFonts from "../../src/styles/fonts/timesNewRoman.module.css";

const ButtonGradient = ({text, handleClick}) => {
    return (
        <button className={`${classesFonts.newRoman400} ${classes.slidingButton}`}
                onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default ButtonGradient;