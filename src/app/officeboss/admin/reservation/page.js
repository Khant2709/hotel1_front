'use client'

import React, {useEffect, useState} from 'react';

import HeaderLineBackground from "../../../../../components/headerLineBackgrund/headerLineBackground";
import {getAllData} from "../../../../../utils/axios";
import ContainerTableReservation from "../../../../particles/admin/reservation/containerTableReservation";
import ContainerCheckInReservation from "../../../../particles/admin/reservation/containerCheckInReservation";

import styles from '../../../../styles/adminStyles/reservation/mainPageReservation.module.css';

export default async function PageReservation() {
    const [allHotel, setAllHotel] = useState([]);
    const [allApartments, setAllApartments] = useState([]);
    const [allReservation, setAllReservation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const hotelData = await getAllData.allHotels();
            setAllHotel(hotelData.data.data);

            const apartmentsData = await getAllData.allApartments();
            setAllApartments(apartmentsData.data.data);

            const reservationsData = await getAllData.allBookings();
            setAllReservation(reservationsData.data.data);
        };

        fetchData();
    }, []);

    // Определение текущей даты
    const currentDate = new Date();
    const yearNow = currentDate.getFullYear();
    const monthNow = currentDate.getMonth();
    const dayNow = currentDate.getDate();

    //Фильтруем не подтвержденные брони
    const reservationNoVerification = allReservation.filter(reservation => reservation.verification === 0);

    //Фильтруем данные по датам для заселения/выселения
    const filterReservationsByDate = (key) => {
        return allReservation.filter(reservation => {
            const date = new Date(reservation[key]);
            return date.getFullYear() === yearNow && date.getMonth() === monthNow && date.getDate() === dayNow;
        });
    };

    const reservationCheckInToday = filterReservationsByDate('startDataReservation');
    const reservationCheckOutToday = filterReservationsByDate('endDataReservation');

    return (
        <>
            <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
            <div className={styles.main}>
                <ContainerTableReservation listReservation={reservationNoVerification}
                                           allHotel={allHotel}
                                           allApartments={allApartments}
                                           title={'Не подтвержденные брони'}
                />

                <ContainerCheckInReservation allReservation={reservationCheckInToday}
                                             allHotel={allHotel}
                                             allApartments={allApartments}
                                             title={'Сегодня заселяются'}
                />

                <ContainerCheckInReservation allReservation={reservationCheckOutToday}
                                             allHotel={allHotel}
                                             allApartments={allApartments}
                                             title={'Сегодня выселяются'}
                />

                <ContainerTableReservation listReservation={allReservation}
                                           allHotel={allHotel}
                                           allApartments={allApartments}
                                           title={'Все брони'}
                />
            </div>
        </>
    );
};

