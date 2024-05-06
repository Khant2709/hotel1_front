'use client'

import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import PropTypes from "prop-types";

import {mainColorHotel, seconderyColorHotel} from "../../../informationData/styleHotels";
import {useWindowWidth} from "../../../utils/UseWidth";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";
import Button from "../../../components/button/button";

import imgTestHotel from '../../../public/testHotel2.jpg';

import styles from "../../styles/secondSectionHotels.module.css";
import stylesFontsT from '../../styles/fonts/timesNewRoman.module.css';

const HotelButtons = ({hotel, router}) => (
    <div className={styles.wrapperBtn}>
        <Button text={'Забронировать'}
                hotel={hotel.numberHotel}
                handleClick={() => router.push(`${hotel.website}/reservation`)}
        />
        <Button text={'Перейти на отель'}
                hotel={hotel.numberHotel}
                handleClick={() => router.push(hotel.website)}
        />
    </div>
);

const HotelInfo = ({hotel, router}) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.informationContainerHotel}`}>
        <p className={styles.nameHotel}
           style={{color: `${mainColorHotel[hotel.numberHotel]}`}}>{hotel.nameHotel}</p>
        <p className={styles.descriptionHotel}>{hotel.descriptionHotel}</p>
        <HotelButtons hotel={hotel} router={router}/>
    </div>
);

const SecondSectionHotels = ({allHotel}) => {
    const width = useWindowWidth();
    const router = useRouter();

    if (!allHotel || !Array.isArray(allHotel) || allHotel.length === 0) {
        return <ErrorLadingData text={'Что-то пошло не так, зайдите на страницу позднее'}
                                page={'Страница Отелей, вторая секция'}
                                error={allHotel}
        />
    }

    return (
        <section className={styles.main}>
            {allHotel.map((hotel, index) => {
                return <div key={index} className={styles.wrapperHotel}
                            style={{background: `${seconderyColorHotel[hotel.numberHotel]}`}}>
                    <div className={styles.containerHotel}>
                        {width > 768
                            ? index % 2 === 0
                                ? <>
                                    <HotelInfo hotel={hotel} router={router}/>
                                    <Image alt={'img'}
                                           src={hotel.imageHotelMain === 'empty' ? imgTestHotel : hotel.imageHotelMain}
                                           style={{marginLeft: '1rem'}}
                                           className={styles.imgHotel}/>
                                </>
                                : <>
                                    <Image alt={'img'}
                                           src={hotel.imageHotelMain === 'empty' ? imgTestHotel : hotel.imageHotelMain}
                                           style={{marginRight: '1rem'}}
                                           className={styles.imgHotel}/>
                                    <HotelInfo hotel={hotel} router={router}/>
                                </>
                            : <div className={`${stylesFontsT.newRoman400} ${styles.informationContainerHotel}`}>
                                <p className={styles.nameHotel}
                                   style={{color: `${mainColorHotel[hotel.numberHotel]}`}}>{hotel.nameHotel}</p>
                                <p className={styles.descriptionHotel}>{hotel.descriptionHotel}</p>
                                <Image alt={'img'}
                                       src={hotel.imageHotelMain === 'empty' ? imgTestHotel : hotel.imageHotelMain}
                                       className={styles.imgHotel}/>
                                <HotelButtons hotel={hotel} router={router}/>
                            </div>
                        }
                    </div>
                </div>
            })}
        </section>
    );
};

SecondSectionHotels.propTypes = {
    allHotel: PropTypes.array.isRequired,
};

export default SecondSectionHotels;