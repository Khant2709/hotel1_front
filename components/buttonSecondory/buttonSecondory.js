'use client'

import React, {useState} from 'react';

import {mainColorHotel} from "../../informationData/styleHotels";

import styles from './buttonSecondory.module.css';
import stylesFontsT from '../../src/styles/fonts/timesNewRoman.module.css';

const ButtonSecondary = ({text, hotel, handleClick, disabled}) => {
    const [isHover, setIsHover] = useState(false);

    const buttonStyle = {
        color: isHover ? 'white' : 'black',
        background: isHover ? `${mainColorHotel[hotel]}` : 'white',
        border: `1px solid ${mainColorHotel[hotel]}`,
    }

    return (
        <button className={`${stylesFontsT.newRoman400} ${styles.btn} ${disabled && styles.disabled}`}
                style={buttonStyle}
                onClick={handleClick}
                disabled={disabled}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
            {text}
        </button>
    );
};

export default ButtonSecondary;