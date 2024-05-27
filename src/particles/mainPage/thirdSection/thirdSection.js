import React from 'react';
import Image from "next/image";

import Title from "../../../../components/title/title";
import {testRoomsPhotos} from "../../../../informationData/dataHotels";

import styles from "../../../styles/thirdSection.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

import imgTestHotel from "../../../../public/testHotel2.jpg";


const ThirdSection = ({hotel}) => {
    return (
        <section className={styles.main}>
            <Title Tag={'h2'} text={'Територия'}/>
            <div className={styles.mainWrapper}>

                <div className={styles.firstContainer}>

                    <div className={`${stylesFontsT.newRoman400} ${styles.descriptionTerritory}`}>
                        <p className={styles.subTitle}>Наша территория:</p>
                        <ul className={styles.list}>
                            {hotel.territory.split('&').map((el, index) => {
                                return <li key={index}> {el} </li>
                            })}
                        </ul>
                        <p className={styles.subTitle}>О пляже:</p>
                        {hotel.beachInformation.split('&').map((el, i) => {
                            return <p key={i}>
                                {el}
                            </p>
                        })}
                    </div>

                    <div className={styles.wrapperImgMain}>
                        <Image alt={'img'}
                               src={hotel.imageHotelMain === 'empty' ? imgTestHotel : hotel.imageHotelMain}
                               className={styles.mainImg}/>
                    </div>
                </div>

                <div className={styles.secondContainerMain}>
                    {testRoomsPhotos.slice(0, 4).map((photo, index) => {
                        return <Image key={index} alt={'img'} src={photo} className={styles.otherImg}/>
                    })}
                </div>
                <div className={styles.secondContainerMobile}>
                    <marquee behavior={'alternate'} scrollamount={5} loop={-1}>
                        {testRoomsPhotos.slice(0, 4).map((photo, index) => {
                            return <Image key={index} alt={'img'} src={photo} className={styles.otherImg}/>
                        })}
                    </marquee>
                </div>
            </div>
        </section>
    );
}

export default ThirdSection;