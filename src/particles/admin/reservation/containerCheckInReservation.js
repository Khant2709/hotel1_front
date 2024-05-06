'use client'

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/navigation';

import Title from '../../../../components/title/title';
import TableReservation from '../../../../components/adminComponents/tableReservation/tableReservation';

import styles from '../../../styles/adminStyles/reservation/сontainerTableReservation.module.css';

const ContainerCheckInReservation = ({allReservation, allHotel, allApartments, title}) => {
    const router = useRouter();
    const [hotelNameFilter, setHotelNameFilter] = useState('');
    const [filteredReservations, setFilteredReservations] = useState(allReservation);

    useEffect(() => {
        if (!hotelNameFilter || allHotel.length === 0) {
            setFilteredReservations(allReservation);
        } else {
            const filtered = allReservation.filter((reservation) => {
                const currentHotel = allHotel.find((hotel) => hotel.id === reservation.idHotel);
                return currentHotel.nameHotel.toLowerCase().includes(hotelNameFilter.toLowerCase());
            });
            setFilteredReservations(filtered);
        }
    }, [hotelNameFilter, allReservation, allHotel]);

    const handleHotelNameChange = (e) => {
        e.persist();
        setHotelNameFilter(e.target.value);
    };

    return (
        <div className={styles.main}>
            <Title Tag="h2" text={title}/>
            {!allReservation || allReservation.length === 0 ? (
                <p className={styles.emptyText}>Список броней пуст</p>
            ) : (
                <>
                    <div className={styles.containerSearcher}>
                        <div className={styles.wrapperSearch}>
                            <p>Введите отель:</p>
                            <input
                                placeholder="Название отеля"
                                onChange={handleHotelNameChange}
                                value={hotelNameFilter}
                            />
                        </div>
                    </div>

                    {!filteredReservations || filteredReservations.length === 0 ? (
                        <p  className={styles.emptyText}>Брони не найдены</p>
                    ) : (
                        <TableReservation
                            filterReservation={filteredReservations}
                            allApartments={allApartments || []}
                            allHotel={allHotel || []}
                            router={router}
                        />
                    )}
                </>
            )}
        </div>
    );
};

ContainerCheckInReservation.propTypes = {
    allReservation: PropTypes.array.isRequired,
    allHotel: PropTypes.array.isRequired,
    allApartments: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default ContainerCheckInReservation;
