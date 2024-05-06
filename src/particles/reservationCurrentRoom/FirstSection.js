import React from 'react';
import Image from "next/image";

import {moveLeft, moveRight} from "../../../utils/moveSlider";
import {testRoomsPhotos} from "../../../informationData/dataHotels";

import iconArrow from "../../../public/ArrowRight.png";

import styles from "../../styles/reservationCurrentRoomFirstSection.module.css";

const FirstSection = ({width, mainImg, setMainImg, countSlice, setCountSlice}) => (
    <div className={styles.containerImages}>
        {width > 768
            ? <>
                <Image alt={'img'} src={mainImg} className={styles.img1} priority={true}/>
                <div className={styles.wrapperImages}>
                    {testRoomsPhotos.slice(1).map((img, index) => {
                        return <Image key={index}
                                      alt={'img'}
                                      src={img}
                                      onClick={() => setMainImg(img)}
                                      className={styles.imgSmall}/>
                    })}
                </div>
            </>
            : <>
                <Image alt={'left'}
                       src={iconArrow}
                       style={countSlice.start === 0 && {opacity: 0.4}}
                       className={styles.arrowLeft}
                       onClick={() => moveLeft({countSlice, setCountSlice})}/>
                {testRoomsPhotos.slice(countSlice.start, countSlice.end).map((img, index) => {
                    return <Image key={index}
                                  alt={'img'}
                                  src={img}
                                  priority={true}
                                  className={styles.img1}/>
                })}
                <Image alt={'right'}
                       src={iconArrow}
                       style={countSlice.end >= testRoomsPhotos.length && {opacity: 0.4}}
                       className={styles.arrowRight}
                       onClick={() => moveRight({countSlice, setCountSlice, array: testRoomsPhotos})}/>
            </>
        }
    </div>
);

export default FirstSection;