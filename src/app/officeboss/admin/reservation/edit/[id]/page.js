import React from 'react';
import HeaderLineBackground from "../../../../../../../components/headerLineBackgrund/headerLineBackground";
import {getAllData} from "../../../../../../../utils/axios";
import allRequest from "../../../../../../../utils/allRequest";
import MainCurrentReservation from "../../../../../../particles/admin/reservation/currentReservatin";

import stylesMain from '../../../../../../styles/adminStyles/reservation/mainPageReservation.module.css';

async function getData(id) {
    const hotelData = {
        allHotel: [],
        allApartments: [],
        currentReservation: {},
    };

    const request = [
        () => getAllData.allHotels(),
        () => getAllData.allApartments(),
        () => getAllData.currentBooking(id),
    ];

    return await allRequest(hotelData, request);
}

export default async function PageEditCurrentReservation({params: {id}}) {
    try {
        const {allHotel, allApartments, currentReservation} = await getData(id);
        const currentHotel = allHotel.find(hotel => hotel.id === currentReservation.idHotel);
        const currentApartment = allApartments.find(apartment => apartment.id === currentReservation.idApartment);

        return (
            <>
                <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                <div className={stylesMain.main}>
                    <MainCurrentReservation
                        currentHotel={currentHotel}
                        currentApartment={currentApartment}
                        currentReservation={currentReservation}
                    />
                </div>
            </>
        );
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return (
            <>
                <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
                <div className={stylesMain.main}>
                    <p className={stylesMain.warningText}>Произошла ошибка при загрузке данных. Либо такой брони не
                        существует.</p>
                </div>
            </>
        );
    }
};

