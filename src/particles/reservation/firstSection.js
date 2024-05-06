'use client'

import React, {useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Image from "next/image";
import {useRouter} from "next/navigation";

import Title from "../../../components/title/title";
import {useWindowWidth} from "../../../utils/UseWidth";
import {moveLeft, moveRight} from "../../../utils/moveSlider";

import imgTestHotel from "../../../public/testHotel2.jpg";
import arrowImg from "../../../public/ArrowRight.png";

import styles from "../../styles/reservation.module.css";
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";
import {mainColorHotel, seconderyColorHotel} from "../../../informationData/styleHotels";


const FirstSection = ({allHotel, currentHotel}) => {
    const router = useRouter();
    const width = useWindowWidth();
    const [countSlice, setCountSlice] = useState({start: 0, end: 3});

    const otherHotels = useMemo(() => {
        if (!currentHotel || !currentHotel?.id || !allHotel || !Array.isArray(allHotel)) return [];
        return allHotel.filter(hotel => hotel.numberHotel !== currentHotel.numberHotel);
    }, [allHotel, currentHotel]);

    useEffect(() => {
        if (width > 1100) setCountSlice({start: 0, end: 3});
        else if (width <= 1100 && width > 768) setCountSlice({start: 0, end: 2});
        else setCountSlice({start: 0, end: 1});
    }, [width]);

    return (
        <div className={styles.wrapperOtherHotels}>
            <Title Tag={'h2'} text={'Другие базы отдыха'}/>
            {currentHotel && <div className={styles.containerAllHotels}>
                {width < 1100 &&
                <Image alt={'left'}
                       src={arrowImg}
                       className={styles.iconLeft}
                       style={countSlice.start === 0 && {opacity: 0.1}}
                       onClick={() => moveLeft({countSlice, setCountSlice})}
                />}

                {otherHotels.slice(countSlice.start, countSlice.end).map(hotel => {
                    return <div key={hotel.id}
                                className={`${stylesFontsT.newRoman400} ${styles.containerHotel}`}
                                style={{backgroundColor: `${seconderyColorHotel[currentHotel.numberHotel]}`}}>
                        <Image alt={'img'}
                               src={hotel.imageHotelMain === 'empty' ? imgTestHotel : hotel.imageHotelMain}
                               className={styles.imgHotel}/>
                        <p className={styles.title}>{hotel.nameHotel}</p>
                        <div className={styles.line}
                             style={{backgroundColor: `${mainColorHotel[currentHotel.numberHotel]}`}}/>
                        <p className={styles.description}>{hotel.descriptionHotel}</p>
                        <p className={styles.link} onClick={() => router.push(`${hotel.website}/reservation`)}>
                            Перейти
                        </p>
                    </div>
                })}

                {width < 1100 &&
                <Image alt={'right'}
                       src={arrowImg}
                       className={styles.iconRight}
                       style={countSlice.end >= otherHotels.length && {opacity: 0.4}}
                       onClick={() => moveRight({countSlice, setCountSlice, array: otherHotels})}
                />}
            </div>}
        </div>
    );
};

FirstSection.propTypes = {
    allHotel: PropTypes.array.isRequired,
    currentHotel: PropTypes.object.isRequired,
}

export default FirstSection;