'use client'

import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";

import FormSearchDate from "../../../components/formSerchDate/formSerchDate";

import background from '../../../public/backgroundHotelsPage.webp';

import styles from '../../styles/firstSectionHotels.module.css';
import stylesFontsT from '../../styles/fonts/timesNewRoman.module.css';

const FirstSectionHotels = ({hotelNumber}) => {
    const router = useRouter();

    return (
        <section className={styles.main}>
            <Image alt={'background'} src={background}
                   priority={true}
                   className={styles.background}/>
            <h1 className={`${stylesFontsT.newRoman400} ${styles.title}`}>Отдых на черноморском <br/> побережье</h1>
            <div className={styles.wrapperForm}>
                <FormSearchDate color={'white'} router={router} hotelNumber={hotelNumber}/>
            </div>
        </section>
    );
};

export default FirstSectionHotels;