import React  from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import editIcon from '../../../public/editIcon.png';

import styles from './tableReservation.module.css';
import stylesFont from '../../../src/styles/fonts/timesNewRoman.module.css';

const TableReservation = ({ filterReservation, allHotel, allApartments, router }) => {

    const renderReservationRows = () => {
        const currentDate = new Date();

        return filterReservation.map((reservation) => {
            const currentHotel = allHotel.find((hotel) => hotel.id === reservation.idHotel);
            const currentApartment = allApartments.find((apartment) => apartment.id === reservation.idApartment);
            const startDataReserv = new Date(reservation.startDataReservation).toLocaleDateString();
            const endDataReserv = new Date(reservation.endDataReservation).toLocaleDateString();

            const finishedLiving = currentDate > new Date(reservation.endDataReservation);
            const nowLiving =
                currentDate >= new Date(reservation.startDataReservation) &&
                currentDate <= new Date(reservation.endDataReservation);

            //Делаем формат для набора удаляем все лишнее из номера
            const transformPhone = reservation.phoneNumberGuest.replace(/\D/g, '');

            return (
                <tr key={reservation.id} className={`${nowLiving && styles.nowLiving} ${finishedLiving && styles.finishedLiving}`}>
                    <td className={styles.edit} onClick={() => router.push(`/officeboss/admin/reservation/edit/${reservation.id}`)}>
                        <Image alt="edit" src={editIcon} className={styles.editIcon} />
                    </td>
                    <td>{reservation.id}</td>
                    <td>{reservation.nameGuest}</td>
                    <td><a href={`tel:${transformPhone}`}>{reservation.phoneNumberGuest}</a></td>
                    <td>{currentHotel ? currentHotel.nameHotel : 'Не найден'}</td>
                    <td>{currentApartment ? currentApartment.nameApartment : 'Не найден'}</td>
                    <td>{startDataReserv}</td>
                    <td>{endDataReserv}</td>
                    <td>{reservation.prepayment}</td>
                    <td>{reservation.verification === 0 ? 'нет' : 'да'}</td>
                </tr>
            );
        });
    };

    return (
        <div className={styles.wrapperTable}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th></th>
                    <th>№</th>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Отель</th>
                    <th>Номер</th>
                    <th>Начало</th>
                    <th>Конец</th>
                    <th>$$</th>
                    <th>ok</th>
                </tr>
                </thead>
                <tbody className={stylesFont.newRoman400}>
                {renderReservationRows()}
                </tbody>
            </table>
        </div>
    );
};

TableReservation.propTypes = {
    filterReservation: PropTypes.array.isRequired,
    allHotel: PropTypes.array.isRequired,
    allApartments: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired,
};

export default React.memo(TableReservation);
