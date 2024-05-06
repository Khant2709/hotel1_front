'use client'

import React from 'react';
import {useRouter} from "next/navigation";
import PropTypes from 'prop-types';

import TitleMainPage from "../TitleMainPage/TitleMainPage";
import CardApartment from "../cardApartment/cardApartment";
import {validateArray} from "../../utils/validate/validateGettingData";
import ErrorLadingData from "../errorLadingData/errorLadingData";

import imgTestRoom from "../../public/testroom.webp";

import styles from "./ContainerHotel.module.css";

const WrapperHotel = ({hotel, arrayRooms, hasQuery, searchParams, hasErrorRes}) => {
    const searchStartReservation = hasQuery && searchParams.get('startReservation');
    const searchEndReservation = hasQuery && searchParams.get('endReservation');
    const searchCountPeopleReservation = hasQuery && searchParams.get('countPeopleReservation');

    const router = useRouter();
    const validateArrayRooms = validateArray(arrayRooms);

    return (
        <div className={styles.wrapperHotel}>
            <TitleMainPage text={hotel.nameHotel}
                           hasNameHotel={true}
                           hasTopLine={true}
                           hotel={hotel.numberHotel}/>
            {(!validateArrayRooms || !hasErrorRes)
                ? <div className={styles.wrapperCards}>
                    {arrayRooms.map((apartment, indexApartment) => {
                        return <CardApartment
                            image={apartment.mainImage === 'empty' ? imgTestRoom : apartment.mainImage}
                            title={apartment.nameApartment}
                            bedsCount={apartment.bedsCount}
                            roomsCount={apartment.roomsCount}
                            cost={apartment.priceArray ? Math.min(...JSON?.parse(apartment.priceArray)) : 0}
                            numberHotel={hotel.numberHotel}
                            transition={() => router.push(hasQuery
                                ? `/reservation/${hotel.numberHotel}_${apartment.id}?
                                &startReservation=${searchStartReservation.trim()}
                                &endReservation=${searchEndReservation.trim()}
                                &countPeopleReservation=${searchCountPeopleReservation.trim()}`
                                : `/reservation/${hotel.numberHotel}_${apartment.id}`
                            )}
                            key={indexApartment}/>
                    })}
                </div>
                : <ErrorLadingData text={'Ошибка! Не удалось загрузить данные номеров'}
                                   page={'containerHotel'} error={arrayRooms}
                />
            }
        </div>
    );
};

WrapperHotel.propTypes = {
    hotel: PropTypes.object.isRequired,
    arrayRooms: PropTypes.array.isRequired,
}

export default WrapperHotel;