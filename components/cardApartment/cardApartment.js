import React from 'react';
import Image from "next/image";

import {mainColorHotel} from "../../informationData/styleHotels";
import ButtonSecondary from "../buttonSecondory/buttonSecondory";
import transformPrice from "../../utils/transformPrice";

import styles from './cardApartment.module.css';
import stylesFontsT from '../../src/styles/fonts/timesNewRoman.module.css';


const CardApartment = ({image, title, bedsCount, roomsCount, cost, numberHotel, transition}) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.card}`}>
        <Image alt={'image apartment'} src={image} className={styles.img}/>
        <div className={styles.wrapperInformation}>
            <p className={`${stylesFontsT.newRoman700} ${styles.title}`}>{title}</p>
            <div className={styles.row} style={{borderBottom: `1px solid ${mainColorHotel[numberHotel]}`}}>
                <p>Количество гостей</p>
                <p>{bedsCount}</p>
            </div>
            <div className={styles.row} style={{borderBottom: `1px solid ${mainColorHotel[numberHotel]}`}}>
                <p>Количество комнат</p>
                <p>{roomsCount}</p>
            </div>
        </div>
        <div className={styles.row2}>
            <p>
                От {transformPrice(cost)} <span className={styles.cost}>руб/сутки</span>
            </p>
            <ButtonSecondary text={'Подробнее'} hotel={numberHotel} handleClick={transition}/>
        </div>
    </div>
);

export default CardApartment;