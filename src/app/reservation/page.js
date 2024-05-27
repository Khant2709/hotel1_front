import React from 'react';

import FirstSection from "../../particles/reservation/firstSection";
import WrapperHotel from "../../../components/ContainerHotel/ContainerHotel";
import FormSearchDate from "../../../components/formSerchDate/formSerchDate";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";

import allRequest from "../../../utils/allRequest";
import {getAllData} from "../../../utils/axios";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";

import {numberCurrentHotel} from "../../../informationData/contacts";
import {metaDataReservationAllPage} from "../../../metaSeo/metaData";
import {jsonLDReservationPage} from "../../../metaSeo/seoData";

import styles from '../../styles/reservation.module.css';

export const metadata = {
    ...metaDataReservationAllPage,
    openGraph: {
        ...metaDataReservationAllPage.openGraph,
        url: 'https://shikarnyivid.ru/reservation',
    },
}


async function getData() {
    const hotelData = {
        allHotel: [],
        currentHotel: null,
        apartmentsFromHotel: null
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.currentHotels(numberCurrentHotel),
        () => getAllData.apartmentsFromHotel(numberCurrentHotel)
    ];

    return await allRequest(hotelData, request);
}


export default async function Reservation() {
    const {allHotel, currentHotel, apartmentsFromHotel} = await getData();

    const validateAllHotels = validateArray(allHotel);
    const validateApartmentsFromHotel = validateArray(apartmentsFromHotel);
    const validateCurrentHotel = validateObject(currentHotel);

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDReservationPage)}}
            />
            <HeaderLineBackground hotelNumber={numberCurrentHotel}/>

            <div className={styles.wrapperFormSearch}>
                <FormSearchDate hotelNumber={numberCurrentHotel}/>
            </div>

            {(validateApartmentsFromHotel || validateCurrentHotel)
                ? <div style={{minHeight: '20vh'}}>
                    <ErrorLadingData text={'Ошибка! Не удалось загрузить данные номеров'}
                                     page={'reservation'} error={[currentHotel, apartmentsFromHotel]}
                    />
                </div>
                : <WrapperHotel hotel={currentHotel} arrayRooms={apartmentsFromHotel}/>

            }

            {(validateAllHotels || validateCurrentHotel)
                ? <div style={{minHeight: '20vh'}}>
                    <ErrorLadingData text={'Ошибка! Не удалось загрузить данные других отелей'}
                                     page={'reservation'} error={[currentHotel, allHotel]}
                    />
                </div>
                : <FirstSection currentHotel={currentHotel} allHotel={allHotel}/>
            }
        </section>
    );
};

