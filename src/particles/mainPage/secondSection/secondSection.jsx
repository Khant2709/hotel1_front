'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";

import {useWindowWidth} from "../../../../utils/UseWidth";
import Title from "../../../../components/title/title";
import ButtonSecondary from "../../../../components/buttonSecondory/buttonSecondory";
import CardApartment from "../../../../components/cardApartment/cardApartment";

import styles from "../../../styles/secondSection.module.css";

import imgTestRoom from "../../../../public/testroom.webp";


const SecondSection = ({numberHotel, apartments}) => {
    const router = useRouter();
    const width = useWindowWidth();
    const [countSliceEnd, setCountSliceEnd] = useState(6);

    useEffect(() => {
        if (width > 1100) {
            setCountSliceEnd(6);
        }

        if (width <= 1100 && width > 768) {
            setCountSliceEnd(4);
        }

        if (width <= 768) {
            setCountSliceEnd(3);
        }

    }, [width])

    return (
        <section className={styles.main}>
            <Title Tag={'h2'} text={'Номера'}/>
            <div className={styles.containerApartments}>
                {apartments.slice(0, countSliceEnd).map(apartment => {
                    return <CardApartment title={apartment.nameApartment}
                                          numberHotel={numberHotel}
                                          roomsCount={apartment.roomsCount}
                                          bedsCount={apartment.bedsCount}
                                          image={apartment.mainImage === 'empty' ? imgTestRoom : apartment.mainImage}
                                          cost={apartment.priceArray ? Math.min(...JSON?.parse(apartment.priceArray)) : 0}
                                          key={apartment.id}
                                          transition={() => router.push(`/reservation/${numberHotel}_${apartment.id}`)}
                    />
                })}
            </div>
            <ButtonSecondary text={'Смотреть все номера'} hotel={numberHotel}
                             handleClick={() => router.push('reservation')}/>
        </section>
    );
};

export default SecondSection;