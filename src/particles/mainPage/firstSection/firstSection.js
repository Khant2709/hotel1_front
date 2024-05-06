'use client'

import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

import FormCall from "../../../../components/formCall/formCall";
import FormSearchDate from "../../../../components/formSerchDate/formSerchDate";

import background from '../../../../public/mainBackgound.jpg';
import iconDown from '../../../../public/iconDown.png';

import styles from '../../../styles/firstSection.module.css';
import stylesFontsT from '../../../styles/fonts/timesNewRoman.module.css';


const FirstSection = ({hotelNumber, currentHotel}) => {
    const router = useRouter();

    return (
        <section className={styles.main}>
            <Image alt={'background'} src={background} className={styles.background} priority={true}/>
            <div className={styles.wrapperHotels}>
                <h1 className={`${stylesFontsT.newRoman400} ${styles.title}`}>
                    База отдыха<br/>
                    <span className={styles.title2}>{currentHotel?.nameHotel || 'Название отеля'}</span>
                </h1>
                <div className={styles.wrapperFormCall}>
                    <FormCall text={'Заказать'} numberHotel={hotelNumber}/>
                </div>
                <div className={styles.wrapperFormSearch}>
                    <FormSearchDate router={router} hotelNumber={hotelNumber} color={'white'}/>
                </div>
            </div>
            <Image alt={'down'} src={iconDown} className={styles.iconDown}/>
        </section>
    );
};

export default FirstSection;