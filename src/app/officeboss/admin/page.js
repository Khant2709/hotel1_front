'use client'

import React, {useEffect, useState} from 'react';
import HeaderLineBackground from "../../../../components/headerLineBackgrund/headerLineBackground";
import {getAllData} from "../../../../utils/axios";
import Title from "../../../../components/title/title";

import styles from '../../../styles/adminStyles/admin.module.css';
import Container from "../../../../components/adminComponents/startContainer/container";

export default function PageAdmin() {
    const [allReservation, setAllReservation] = useState([]);

    useEffect(() => {
        getAllData.allBookings()
            .then(res => {
                setAllReservation(res.data.data);
            })
    }, [])

    const checkVerification = allReservation.filter(reservation => reservation.verification === 0);

    return (
        <>
            <HeaderLineBackground hotelNumber={'hotel1'} display={true}/>
            <div className={styles.main}>
                <Title Tag={'h2'} text={'Личный кабинет'}/>

                <div className={styles.containerMain}>
                    <Container text={'Посмотреть текущие брони, изменить и добавить новое бронирование'}
                               subtitle={checkVerification.length === 0 ? null : `У вас ${checkVerification.length} не подтверженных броней`}
                               title={'Бронирование'}
                               redirect={'/officeboss/admin/reservation'}/>
                    <Container text={'Добавить новое жилище, изменить существующие, редактирование отеля'}
                               title={'Редактирование'}/>
                </div>
            </div>
        </>
    );
};