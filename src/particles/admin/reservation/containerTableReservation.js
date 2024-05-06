'use client'

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/navigation';

import Title from '../../../../components/title/title';
import TableReservation from '../../../../components/adminComponents/tableReservation/tableReservation';
import checkToken from "../../../../utils/checkToken";

import styles from '../../../styles/adminStyles/reservation/сontainerTableReservation.module.css';
import {getAllData} from "../../../../utils/axios";

const ContainerTableReservation = ({listReservation, allHotel, allApartments, title}) => {
    const router = useRouter();
    const [filterOptions, setFilterOptions] = useState({
        reservationNumber: '',
        guestName: ''
    });
    const [filterReservation, setFilterReservation] = useState(listReservation);

    useEffect(() => checkToken(router), [router]);


    useEffect(() => {
        const {reservationNumber, guestName} = filterOptions;

        if (!reservationNumber && !guestName) {
            setFilterReservation(listReservation);
        } else {
            const filtered = listReservation.filter((reservation) => {
                const checkReservationNumber = !reservationNumber || reservation.id === +reservationNumber;
                const checkGuestName = !guestName || reservation.nameGuest.toLowerCase().includes(guestName.toLowerCase());

                return checkReservationNumber && checkGuestName;
            });
            setFilterReservation(filtered);
        }
    }, [filterOptions, listReservation]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value
        }));
    };

    return (
        <div className={styles.main}>
            <Title Tag="h2" text={title}/>

            {!listReservation || listReservation.length === 0 ? (
                <p className={styles.emptyText}>Список броней пуст</p>
            ) : (
                <>
                    <div className={styles.containerSearcher}>
                        <div className={styles.wrapperSearch}>
                            <p>Введите номер брони:</p>
                            <input
                                name="reservationNumber"
                                placeholder="№"
                                onChange={handleInputChange}
                                value={filterOptions.reservationNumber}
                            />
                        </div>
                        <div className={styles.wrapperSearch}>
                            <p>Введите имя:</p>
                            <input
                                name="guestName"
                                placeholder="Введите имя гостя"
                                onChange={handleInputChange}
                                value={filterOptions.guestName}
                            />
                        </div>
                    </div>

                    {!filterReservation || filterReservation.length === 0 ? (
                        <p className={styles.emptyText}>Брони не найдены</p>
                    ) : (
                        <TableReservation
                            router={router}
                            allHotel={allHotel || []}
                            allApartments={allApartments || []}
                            filterReservation={filterReservation}
                        />
                    )}
                </>
            )}

        </div>
    );
};

ContainerTableReservation.propTypes = {
    listReservation: PropTypes.array.isRequired,
    allHotel: PropTypes.array.isRequired,
    allApartments: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default ContainerTableReservation;
