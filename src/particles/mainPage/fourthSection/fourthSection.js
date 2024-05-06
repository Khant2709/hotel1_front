import React from 'react';
import Image from "next/image";

import Title from "../../../../components/title/title";

import beach from '../../../../public/beachkabardinka.webp';

import styles from '../../../styles/fourthSection.module.css';
import stylesFontsT from '../../../styles/fonts/timesNewRoman.module.css';

const FourthSection = ({descriptionHotel}) => (
    <section className={styles.main}>
        <Title Tag={'h2'} text={'О нас'}/>
        <div className={styles.wrapperMain}>
            <div className={styles.containerDescription}>
                <p className={stylesFontsT.newRoman400}>{descriptionHotel}</p>
            </div>
            <Image alt={'img'} src={beach} className={styles.img}/>
        </div>
    </section>
);

export default FourthSection;