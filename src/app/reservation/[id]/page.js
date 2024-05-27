import React from 'react';
import PropTypes from 'prop-types';

import MainPage from "../../../particles/reservationCurrentRoom/MainPage";

import allRequest from "../../../../utils/allRequest";
import {getAllData} from "../../../../utils/axios";
import {validateArray, validateObject} from "../../../../utils/validate/validateGettingData";

import HeaderLineBackground from "../../../../components/headerLineBackgrund/headerLineBackground";
import ErrorLadingData from "../../../../components/errorLadingData/errorLadingData";

import {jsonLDCurrentRoom} from "../../../../metaSeo/seoData";
import {metaDataCurrentRoom} from "../../../../metaSeo/metaData";

import styles from '../../../styles/apartment.module.css';


export async function generateMetadata({params: {id}}, parent) {
    const hotelNumber = id.split('_')[0];
    const idRoom = id.split('_')[1];

    const getData = await allRequest({
        currentHotel: null,
        currentApartments: null,
    }, [
        () => getAllData.currentHotels(hotelNumber),
        () => getAllData.currentApartments(hotelNumber, idRoom),
    ]);

    return metaDataCurrentRoom(id, getData)

}

async function getData(id) {
    const hotelNumber = id.split('_')[0];
    const currantRoomId = id.split('_')[1];

    const hotelData = {
        currentHotel: null,
        allApartments: [],
        currentApartments: null,
        allBookings: []

    };

    const request = [
        () => getAllData.currentHotels(hotelNumber),
        () => getAllData.allApartments(),
        () => getAllData.currentApartments(hotelNumber, currantRoomId),
        () => getAllData.allBookings()
    ];

    return await allRequest(hotelData, request);
}

export default async function Page({params: {id}}) {
    const {currentHotel, allApartments, currentApartments, allBookings} = await getData(id);
    const validationAllApartments = validateArray(allApartments);
    const validationCurrentHotel = validateObject(currentHotel);
    const validationCurrentApartments = validateObject(currentApartments);

    if (validationAllApartments && validationCurrentHotel && validationCurrentApartments) {
        return (
            <>
                <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                <div className={styles.containerError}>
                    <ErrorLadingData text={'Ошибка! Не удалось загрузить данные текущего номера.'}
                                     error={[currentHotel, allApartments, currentApartments, allBookings]}
                                     page={'reservation/[id]'}
                    />
                </div>
            </>
        )
    }

    const jsonLd = jsonLDCurrentRoom({
        id,
        roomsDescription: currentApartments.roomsDescription,
        nameApartment: currentApartments.nameApartment
    })

    return (
        <section className={styles.main}>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
            <MainPage hotelNumber={currentHotel.numberHotel}
                      currentHotel={currentHotel}
                      allApartments={allApartments}
                      currentApartments={currentApartments}
                      allBookings={allBookings}
            />
        </section>
    );
};

Page.propTypes = {
    currentHotel: PropTypes.object.isRequired,
    allApartments: PropTypes.array.isRequired,
    currentApartments: PropTypes.object.isRequired,
    allBookings: PropTypes.array.isRequired,
}