import React from 'react';
import PropTypes from 'prop-types';

import {getAllData} from "../../../utils/axios";
import allRequest from "../../../utils/allRequest";
import {validateArray, validateObject} from "../../../utils/validate/validateGettingData";

import ReservationAll from "../../particles/reservationall/mainPage";
import ErrorLadingData from "../../../components/errorLadingData/errorLadingData";
import HeaderLineBackground from "../../../components/headerLineBackgrund/headerLineBackground";

import {numberCurrentHotel} from "../../../informationData/contacts";
import {metaDataReservationAllPage} from "../../../metaSeo/metaData";
import {jsonLDReservationAllPage} from "../../../metaSeo/seoData";

import styles from "../../styles/reservation.module.css";


export const metadata = metaDataReservationAllPage;

async function getData() {
    const hotelData = {
        allHotels: [],
        currentHotel: null,
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.currentHotels(numberCurrentHotel),
    ];

    return await allRequest(hotelData, request);
}


export default async function WrapperReservationAll() {
    const {allHotels, currentHotel} = await getData();

    const validateAllHotels = validateArray(allHotels);
    const validateCurrentHotel = validateObject(currentHotel);

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDReservationAllPage)}}
            />
            {(validateAllHotels || validateCurrentHotel)
                ? <>
                    <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                    <div className={styles.wrapperError}>
                        <ErrorLadingData text={'Ошибка! Не удалось загрузить данные отелей и номеров'}
                                         page={'reservationall'} error={[currentHotel, allHotels]}
                        />
                    </div>
                </>
                : <ReservationAll hotelNumber={numberCurrentHotel} allHotels={allHotels} currentHotel={currentHotel}/>
            }

        </section>
    );
};

WrapperReservationAll.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    allHotels: PropTypes.array.isRequired,
}