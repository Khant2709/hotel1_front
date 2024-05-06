import React from 'react';
import Image from "next/image";

import styles from './TitleMainPage.module.css';
import stylesFontsT from '../../src/styles/fonts/timesNewRoman.module.css';

import vectorMain from '../../public/VectorMain.png';
import VectorBrown from '../../public/VectorBrown.png';
import VectorBlue from '../../public/VectorBlue.png';
import VectorWave from '../../public/VectorWave.png';

const TitleMainPage = ({text, hasTopLine, hotel, hasNameHotel}) => {
    const typeLine = {
        'hotel1': vectorMain,
        'hotel2': VectorBrown,
        'hotel3': VectorBlue,
        'hotel4': VectorWave,
    };

    return (
        <div className={styles.wrapperTitle}>
            {hasTopLine && <Image alt={'line'} src={hotel ? typeLine[hotel] : vectorMain} className={styles.line}/>}
            {hasNameHotel && <p className={styles.nameHotel}>База отдыха</p>}
            <p className={stylesFontsT.newRoman400}>{text}</p>
            <Image alt={'line'} src={hotel ? typeLine[hotel] : vectorMain} className={styles.line}/>
        </div>
    );
};

export default TitleMainPage;